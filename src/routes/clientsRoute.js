import { Router } from "express";
import { postClients } from "../controllers/clientsController.js";

export const clientsRoute = Router();

clientsRoute.post("/clients", postClients);