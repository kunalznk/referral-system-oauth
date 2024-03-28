require("dotenv").config();
import mongoose from "mongoose";

const mongo = mongoose.connect(
  process.env.DB!,
  {
    autoIndex: false,
    autoCreate: true,
    dbName: "referral-system",
  },
  () => {
    console.log("connected");
  },
);

export default mongo;
