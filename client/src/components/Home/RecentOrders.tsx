import { useEffect, useState } from "react";
import type { Order } from "../../types";
import { Link } from "react-router-dom";
import { statusColors } from "../../assets/assets";
import { CalendarIcon, ChevronRightIcon, PackageIcon } from "lucide-react";
import api from "../../config/api";
import { useAuth } from "../../context/AuthContext";

const RecentOrders = () => {
    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
    const { token } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        const fetchOrders = async () => {
            try {
                const { data } = await api.get("/orders");
                setOrders((data.orders ?? data ?? []).slice(0, 3)); // show only latest 3
            } catch (error) {
                // silently fail on homepage
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [token]);

    // Don't show section if not logged in or no orders
    if (!token || (!loading && orders.length === 0)) return null;

    return (
        <div className="mt-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-app-green">Recent Orders</h2>
                <Link to="/orders" className="text-sm text-app-green font-medium hover:underline flex items-center gap-1">
                    View All <ChevronRightIcon className="size-4" />
                </Link>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 animate-pulse h-24" />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Link key={order.id} to={`/orders/${order.id}`} className="block max-w-4xl bg-white rounded-2xl p-5 hover:shadow transition-all">
                            {/* order id, date & status */}
                            <div className="flex items-start justify-between mb-3">
                                {/* left */}
                                <div>
                                    <p className="text-sm font-medium text-app-green">Order #{order.id.slice(-8).toUpperCase()}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <CalendarIcon className="size-3 text-app-text-light" />
                                        <span className="text-xs text-app-text-light">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </span>
                                    </div>
                                </div>
                                {/* right */}
                                <div className="flex items-center gap-2">
                                    <span className={`px-4 py-1 text-xs font-medium rounded-full ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                                        {order.status}
                                    </span>
                                    <ChevronRightIcon className="size-4 text-app-text-light" />
                                </div>
                            </div>

                            {/* Item thumbnails */}
                            <div className="flex items-center gap-2 mb-3">
                                {order.items.slice(0, 4).map((item, i) => (
                                    <img key={i} src={item.image} alt={item.name} className="size-12 sm:size-16 rounded-lg object-cover border border-app-border" />
                                ))}
                                {order.items.length > 4 && (
                                    <div className="size-12 sm:size-16 rounded-lg bg-app-cream flex-center text-xs font-semibold text-app-text-light">
                                        +{order.items.length - 4}
                                    </div>
                                )}
                            </div>

                            {/* total items & price */}
                            <div className="flex justify-between items-center pt-3 text-sm">
                                <span className="text-app-text-light">{order.items.length} items</span>
                                <span className="font-semibold text-app-green">
                                    {currency}{order.total.toFixed(2)}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Empty state - only shown to logged in users with no orders */}
            {!loading && orders.length === 0 && (
                <div className="text-center py-10 bg-white rounded-2xl">
                    <PackageIcon className="size-12 text-app-border mx-auto mb-3" />
                    <p className="text-sm font-medium text-app-green mb-1">No orders yet</p>
                    <p className="text-xs text-app-text-light">Your recent orders will appear here</p>
                </div>
            )}
        </div>
    );
};

export default RecentOrders;
