import express from "express";
import {
  createUser,
  deleteUser,
  getSingleUser,
  getUsers,
  signOut,
  updateUser,
} from "../controllers/userControllers.js";
import verifyUser from "../middlewares/verifyUser.js";
import verifyToken from "../middlewares/verifyToken.js";

//create router using express
const router = express.Router();

//verify User:

router.post("/createUser", createUser);
router.post("/updateUser/:userId", verifyUser, updateUser);
router.delete("/deleteUser/:userId", verifyUser, deleteUser);
router.get("/signOut", signOut);
router.get("/get-users", verifyToken, getUsers);

// export router
export default router;
