require('dotenv').config()
import { NextFunction, Response, Request } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import randomstring from "randomstring";
import { UserModel, buildUser } from "../model/userModel";
import { generateAccessToken, generateJwtToken, generateRefreshToken } from "../utils/tokenUtils";
import { ReferralCodeModel, buildIReferralCode } from "../model/referralModel";
import { now } from "mongoose";
import { generateToken } from "../utils/util";

const createReferralCode = async (req: Request, res: Response) => {

    try {
        
        const userId = req.user._id as string; 
    const code = randomstring.generate({
        charset:"1234567890ASDFGHJKLQWERTYUIOPMNBVCXZ",
        length:6
    });
    const expiresAt = addMinutes(30, new Date()) as unknown as string;

    const referralCode = await buildIReferralCode({
        code,
        userId,
        expiresAt
    }).save()

    res.status(201).json(referralCode.toJSON())
} catch (error) {
        res.status(500).json({message: 'server error'})
}
  };

  const validateReferalCode = async (req: Request, res: Response) => {

    try {
        
    const userId = "66057ca7586000959ab83626" ?? req.user;
    console.log(req.user, "req.user")

    const code = req.query.referralCode as string
    const now = (new Date()).toISOString()

    const userRefs = await ReferralCodeModel.findOne(
        { code, expiresAt: { $gte: new Date()}}
    )

   if(userRefs) {
    // await UserModel.findOneAndUpdate({
    //     _id: userRefs?.id
    // }, {
    //    $inc: { points : 10} 
    // })
       res.status(200).json({ message: "validate successfully"})
   } else {
    res.status(401).json({ message: "invalid referral code"})

   }
} catch (error) {
        res.status(500).json({message: 'server error'})
}
  };

  export const getReferralsByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id as string; 

        const referralCodes = await ReferralCodeModel.find({ userId: new mongoose.Types.ObjectId(userId) });

        const referralData = await Promise.all(referralCodes.map(async (referralCode) => {
            const registeredUsers = await UserModel.find({ referredBy: new mongoose.Types.ObjectId(referralCode._id) });
            return { code: referralCode.code, registeredUsers };
        }));

        return res.status(200).json(referralData);
        
    } catch (error) {
        console.error("Error getting referrals by user ID:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getScores = async (req: Request, res: Response) => {
    try {
        const usersWithInfo = await UserModel.find();
        return res.status(200).json(usersWithInfo);
    } catch (error) {
        console.error("Error fetching users with scores and custom information:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export default {
    createReferralCode,
    validateReferalCode,
    getReferralsByUserId,
    getScores
}

function addMinutes (minutes, date = new Date()) {  
    if (typeof minutes !== 'number') {
      throw new Error('Invalid "minutes" argument')
    }
  
    if (!(date instanceof Date)) {
      throw new Error('Invalid "date" argument')
    }
  
    date.setMinutes(date.getMinutes() + minutes)
  
    return date
  }