import { Router } from "express";
import { getOrders, getOrdersById, postOrder } from "../controllers/ordersController.js";

const ordersRoute = Router();

ordersRoute.post("/order", postOrder);
ordersRoute.get("/orders", getOrders);
ordersRoute.get("/orders/:id", getOrdersById);

export default ordersRoute;