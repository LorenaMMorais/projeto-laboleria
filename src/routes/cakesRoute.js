import { Router } from "express";
import { postCakes } from "../controllers/cakesController.js";

const cakesRoute = Router();

cakesRoute.post("/cakes", postCakes);

export default cakesRoute;