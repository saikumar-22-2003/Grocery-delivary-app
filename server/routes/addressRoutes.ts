import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
// import { assignDeliveryPartner, createDeliveryPartner, getAdminStats, getDeliveryPartners, updateDeliveryPartner } from "../controllers/adminController.js";
import { addAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/addressController.js";
const addressRouter = express.Router();

addressRouter.get("/", auth, getAddresses);
addressRouter.post("/", auth, addAddress);
addressRouter.put("/:id", auth, updateAddress);
addressRouter.delete("/:id", auth, deleteAddress);

export default addressRouter;

// adminRouter.put("/orders/:id/assign", auth, admin, assignDeliveryPartner);

// export default adminRouter;
