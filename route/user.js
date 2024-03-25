import express from "express";
import {
  createUser,
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/userControllers.js";
import verifyToken from "../middlewares/verifyToken.js";

//create router using express
const router = express.Router();

//verify User:

//crete routes: http://localhost:3232/api/v1/user/createUser
router.route("/createUser").post(createUser);
router.route("/getAllUsers").get(getAllUsers);

router
  .route("/:id")
  .get(getSingleUser)
  .delete(deleteSingleUser)
  .put(updateUser);

// export router
export default router;
