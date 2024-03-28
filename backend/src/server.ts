require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
import mongo from "./config/db";
import googleOauth from "./config/google";
import authRouter from "./routes/authRoutes";
import referralRoute from "./routes/referralRoutes";
const passport = require("passport");
import cookieParser from "cookie-parser";

const app = express();

mongo;

passport.use(googleOauth);

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.use(cookieParser());


app.use("/auth", authRouter);
app.use("/referral", referralRoute);

app.get("/test", (_req: Request, res: Response) => {
  res.status(200).json("Server is Running");
});

app.listen(+process.env.HTTP_PORT!, () => {
  console.log("Servier is listening on port ", +process.env.HTTP_PORT!);
});
