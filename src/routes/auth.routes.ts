import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.post("/refresh", AuthController.refresh);

export default authRoutes;