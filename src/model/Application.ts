import mongoose, { Schema, Document } from "mongoose";
import { ApplicationStatus } from "@/constant/enum/ApplicationStatus";

export interface IApplication extends Document {
  bookId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  status: ApplicationStatus;
  appliedDate: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "books",
      required: [true, "Book ID is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "members",
      required: [true, "User ID is required"],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(ApplicationStatus),
        message: "Invalid application status",
      },
      default: ApplicationStatus.PENDING,
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "members",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Application =
  mongoose.models.applications ||
  mongoose.model<IApplication>("applications", ApplicationSchema);

export default Application;
