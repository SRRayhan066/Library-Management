import { UserType } from "@/constant/enum/UserType";
import { REGEX_PATTERNS } from "@/lib/Regex";
import mongoose, { Schema } from "mongoose";

const MemberSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [REGEX_PATTERNS.EMAIL, "Invalid email"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: {
        values: Object.values(UserType),
        message: "Invalid user",
      },
      default: UserType.STUDENT,
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.models.member || mongoose.model("member", MemberSchema);

export default Member;
