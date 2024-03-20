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

router.use(verifyToken);

//crete routes:
router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getSingleUser)
  .delete(deleteSingleUser)
  .put(updateUser);

// export router
export default router;
