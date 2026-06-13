import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../config/prisma.js";
import { inngest } from "../inngest/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const stripeWebhook = async (request: Request, response: Response) => {
    // FIX 1: Check endpointSecret exists first
    if (!endpointSecret) {
        console.log("⚠️ STRIPE_WEBHOOK_SECRET is not set");
        return response.sendStatus(500);
    }

    const signature = request.headers["stripe-signature"];
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            request.body,
            signature as string,
            endpointSecret
        );
    } catch (err: any) {
        console.log(`⚠️ Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
    }

    //  FIX 2: Always send response immediately after verification
    response.json({ received: true });

    try {
        switch (event.type) {

            //  FIX 3: Use checkout.session.completed instead of payment_intent.succeeded
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                //  Metadata is directly available here — no extra API call needed
                const { orderId } = session.metadata as { orderId: string };

                if (!orderId) {
                    console.log("⚠️ No orderId in session metadata");
                    break;
                }

                // ✅ Mark order as paid
                const paidOrder = await prisma.order.update({
                    where: { id: orderId },
                    data: { isPaid: true },
                });

                // ✅ Decrease stock
                const orderItems = Array.isArray(paidOrder.items)
                    ? (paidOrder.items as any[])
                    : [];

                for (const item of orderItems) {
                    await prisma.product.update({
                        where: { id: item.product },
                        data: { stock: { decrement: item.quantity } },
                    });
                }

                // ✅ Send inngest events
                await inngest.send({ name: "order/placed", data: { orderId } });

                for (const item of orderItems) {
                    await inngest.send({
                        name: "inventory/stock.updated",
                        data: { productId: item.product },
                    });
                }

                break;
            }

            // ✅ Handle payment expiry / cancellation
            case "checkout.session.expired":
            case "payment_intent.canceled":
            case "payment_intent.payment_failed": {
                let failureOrderId: string | null = null;

                if (event.type === "checkout.session.expired") {
                    // ✅ Get orderId directly from session metadata
                    const session = event.data.object as Stripe.Checkout.Session;
                    failureOrderId = (session.metadata as any)?.orderId;
                } else {
                    // For payment_intent events, look up the session
                    const paymentIntent = event.data.object as Stripe.PaymentIntent;
                    const sessions = await stripe.checkout.sessions.list({
                        payment_intent: paymentIntent.id,
                    });

                    // ✅ FIX: Guard against empty session list
                    if (sessions.data.length === 0) {
                        console.log("⚠️ No session found for payment intent");
                        break;
                    }

                    failureOrderId = (sessions.data[0].metadata as any)?.orderId;
                }

                if (!failureOrderId) {
                    console.log("⚠️ No orderId found for failed payment");
                    break;
                }

                await prisma.order.delete({ where: { id: failureOrderId } });
                console.log(`🗑️ Deleted order ${failureOrderId} due to payment failure`);
                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (err: any) {
        // ✅ FIX: Catch async errors so they don't crash the server
        console.error("❌ Webhook handler error:", err.message);
    }
};
