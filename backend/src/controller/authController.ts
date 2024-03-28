require("dotenv").config();
import { NextFunction, Response, Request } from "express";
import { UserModel, buildUser } from "../model/userModel";
import { ReferralCodeModel } from "../model/referralModel";
import { now } from "mongoose";
import { generateToken } from "../utils/util";

const googleAuthCallback = async (req: Request, res: Response) => {
  const {
    name: { familyName, givenName },
    _json: { email },
  } = req.user.profile;

    const { state: code } = req.query
  let user = await UserModel.findOne({ email });
  if (user) {
    console.log(user.toJSON(), "dd")
    const [accessToken, refreshToken, jwtToken] = generateToken(user);
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.cookie("jwtToken", jwtToken);
    res.redirect("http://localhost:5173/");
    // res.status(401).json({ message: "user already exist" });
    return;
  }


  const userRefs = await ReferralCodeModel.findOne({
    code,
    expiresAt: { $gte: new Date() },
  });
  user = await buildUser({
    email,
    name: givenName,
    points: 0,
    referredBy: userRefs?.userId ?? null,
    referralCode: code as string,
  }).save();

  if (userRefs) {
    await UserModel.findOneAndUpdate(
      {
        _id: userRefs?.userId,
      },
      {
        $inc: { points: 10 },
      },
    );
  }

  const [accessToken, refreshToken, jwtToken] = generateToken(user);
  res.cookie("accessToken", accessToken);
  res.cookie("refreshToken", refreshToken);
  res.cookie("jwtToken", jwtToken);
  res.redirect("http://localhost:5173/");

};

const logout = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("jwtToken");
  res.send(200).send()
//   res.json({ message: "Logout successfully" });
};

export default {
  googleAuthCallback,
  logout,
};
