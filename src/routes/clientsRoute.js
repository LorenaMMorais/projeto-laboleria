import { Router } from "express";
import { getClientsOrder, postClients } from "../controllers/clientsController.js";
import clientsSchema from "../schemas/clientsSchema.js";
import { validation } from "../middlewares/authMiddleware.js";

const clientsRoute = Router();

clientsRoute.post("/clients", validation(clientsSchema), postClients);
clientsRoute.get("/clients/:id/orders", getClientsOrder);

export default clientsRoute;