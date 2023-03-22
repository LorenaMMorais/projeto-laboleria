import { Router } from "express";
import { postOrders } from "../controllers/ordersController.js";

export const ordersRoute = Router();

ordersRoute.post("/order", postOrders);