import mongoose from "mongoose";
import { HttpStatusCode } from "@/constant/enum/HttpStatusCode";
import Application from "@/model/Application";
import Book from "@/model/Book";
import { ApiError } from "@/wrapper/ApiError";
import { ApplicationStatus } from "@/constant/enum/ApplicationStatus";

export class ApplicationService {
  static async createApplication({
    bookId,
    userId,
    fromDate,
    toDate,
    quantity,
  }: {
    bookId: string;
    userId: string;
    fromDate: string;
    toDate: string;
    quantity: number;
  }) {
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      throw new ApiError("Book not found", HttpStatusCode.NOT_FOUND);
    }

    const newApplication = await Application.create({
      bookId,
      userId,
      status: ApplicationStatus.PENDING,
      appliedDate: new Date(),
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      quantity,
    });

    return newApplication;
  }

  static async getApplicationsByUser(userId: string) {
    const applications = await Application.find({ userId })
      .populate("bookId")
      .populate({
        path: "userId",
        populate: {
          path: "referenceId",
        },
      })
      .sort({ createdAt: -1 });
    return applications;
  }

  static async getAllApplications() {
    const applications = await Application.find()
      .populate("bookId")
      .populate({
        path: "userId",
        populate: {
          path: "referenceId",
        },
      })
      .sort({ createdAt: -1 });
    return applications;
  }

  static async updateApplicationStatus({
    applicationId,
    status,
    adminId,
  }: {
    applicationId: string;
    status: ApplicationStatus;
    adminId: string;
  }) {
    const application = await Application.findById(applicationId);
    if (!application) {
      throw new ApiError("Application not found", HttpStatusCode.NOT_FOUND);
    }

    application.status = status;
    application.updatedBy = adminId as unknown as mongoose.Types.ObjectId;
    await application.save();

    return application;
  }
}
