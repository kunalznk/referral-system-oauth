import { Router } from "express";
import referralController from "../controller/referralContorller";
import { authMiddleware } from "../middleware/authMiddleware";
const referralRoute = Router();

referralRoute.get("/", referralController.validateReferalCode);
referralRoute.post("/", authMiddleware, referralController.createReferralCode);
referralRoute.get("/user/", authMiddleware, referralController.getReferralsByUserId);
referralRoute.get("/users/", authMiddleware, referralController.getScores);


export default referralRoute;
