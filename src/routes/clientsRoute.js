import { Router } from "express";
import { getClientsOrder, postClients } from "../controllers/clientsController.js";

const clientsRoute = Router();

clientsRoute.post("/clients", postClients);
clientsRoute.get("/clients/:id/orders", getClientsOrder);

export default clientsRoute;