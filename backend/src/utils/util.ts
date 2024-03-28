import jwt from "jsonwebtoken";
import constants from "./constants";

export const verifyGoogleToken = () => {
  // verfiy google auth token
};

export const generateToken = (user) => {
  const usr = user.toJSON()
  const accessToken = signToken(usr);
  const refreshToken = signToken(usr);
  const jwtToken = signToken(usr);

  return [accessToken, refreshToken, jwtToken];
};

export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY!, constants.jwtOption);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!, constants.jwtOption);
  } catch (error) {
    return null;
  }
};
