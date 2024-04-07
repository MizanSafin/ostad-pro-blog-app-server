import express from "express";
import {
  createUser,
  deleteSingleUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  signOut,
  updateUser,
} from "../controllers/userControllers.js";
import verifyUser from "../middlewares/verifyUser.js";

//create router using express
const router = express.Router();

//verify User:

router.get("/getAllUsers", getAllUsers);
router.post("/createUser", createUser);
router.post("/updateUser/:userId", verifyUser, updateUser);
router.delete("/deleteUser/:userId", verifyUser, deleteUser);
router.get("/signOut", signOut);
//crete routes: http://localhost:3232/api/v1/user/createUser
// router.route("/createUser").post(createUser);
// router.route("/getAllUsers").get(getAllUsers);

// router
//   .route("/:id")
//   .get(getSingleUser)
//   .delete(deleteSingleUser)
//   .put(updateUser);

// export router
export default router;
