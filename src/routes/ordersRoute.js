import { Router } from "express";
import { getOrders, getOrdersById, postOrder } from "../controllers/ordersController.js";
import ordersSchema from "../schemas/ordersSchema.js";
import { validation } from "../middlewares/authMiddleware.js";

const ordersRoute = Router();

ordersRoute.post("/order", validation(ordersSchema), postOrder);
ordersRoute.get("/orders", getOrders);
ordersRoute.get("/orders/:id", getOrdersById);

export default ordersRoute;