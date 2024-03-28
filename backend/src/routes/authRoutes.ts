import { Router } from "express";
import passport from "passport";
import authController from "../controller/authController";

const authRouter = Router();

// Google authentication route
authRouter.get(
  "/google",
  (req, res, next) => {
    const { referralCode } = req.query
    console.log(referralCode);
    const state = referralCode as string
    const authenticator = passport.authenticate("google", { scope: ["profile", "email"], state })
    authenticator(req, res, next)
  }
);

// Google callback route
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.googleAuthCallback,
);

authRouter.post("/logout", authController.logout);

export default authRouter;
