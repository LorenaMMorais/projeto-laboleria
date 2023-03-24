import { Router } from "express";
import { postCakes } from "../controllers/cakesController.js";
import cakesSchema from "../schemas/cakesSchema.js";
import { validation } from "../middlewares/authMiddleware.js";

const cakesRoute = Router();

cakesRoute.post("/cakes", validation(cakesSchema), postCakes);

export default cakesRoute;