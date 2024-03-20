import { app } from "./app.js";
import dotenv from "dotenv";
import colors from "colors";
import { dbConnect } from "./config/db.js";

dotenv.config();
//setup environment variable :
const PORT = process.env.PORT || 7070;

//listen application :
app.listen(PORT, () => {
  console.log(`App is listening at the port ${PORT}`.bgRed.yellow);
  dbConnect();
});
