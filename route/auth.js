import express from "express";
import { logOut, loginUser } from "../controllers/authController.js";

//create router using express
const router = express.Router();

//crete routes:
router.route("/login").post(loginUser);
router.route("/logout").post(logOut);

// export router
export default router;
