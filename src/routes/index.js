import { Router } from "express";
import cakesRoute from "./cakesRoute.js";
import clientsRoute from "./clientsRoute.js";
import ordersRoute from "./ordersRoute.js";

const router = Router();

router.use(cakesRoute);
router.use(clientsRoute);
router.use(ordersRoute);

export default router;