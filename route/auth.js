import express from "express";
import {
  googleAuth,
  logOut,
  loginUser,
} from "../controllers/authController.js";

//create router using express
const router = express.Router();

//crete routes:
router.route("/login").post(loginUser);
router.route("/logout").post(logOut);
router.post("/google", googleAuth);

// export router
export default router;
