import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const verifyUser = expressAsyncHandler((req, res, next) => {
  let token = req.cookies.accessToken;

  if (!token) {
    return res.status(404).send(`Unauthorized`);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(404).send(`Unauthorized`);
    }
    req.userId = decoded["id"];

    next();
  });
});

export default verifyUser;
