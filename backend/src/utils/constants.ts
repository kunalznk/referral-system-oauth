require("dotenv").config();
import jwt from "jsonwebtoken";

const jwtOption: jwt.SignOptions = {
  expiresIn: "1d",
  issuer: process.env.DOMAIN,
  audience: process.env.CLIENT,
};
export default {
  jwtOption,
};
