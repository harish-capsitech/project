import expressRouter from "express";
export const router = expressRouter.Router();

import {verifyToken} from "../middleware/verifyToken.js"
import { getUser, registerUser, loginUser } from "../controllers/userController.js";
router.get("/users", verifyToken, getUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);

