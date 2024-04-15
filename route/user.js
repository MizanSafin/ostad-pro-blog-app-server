import express from "express";
import {
  createUser,
  deleteUser,
  deleteUserByAdmin,
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
router.get("/delete/:adminId", verifyToken, deleteUserByAdmin);

// export router
export default router;
