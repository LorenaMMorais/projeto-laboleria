import { Router } from "express";
import { postCakes } from "../controllers/cakesController.js";

export const cakesRoute = Router();

cakesRoute.post("/cakes", postCakes);