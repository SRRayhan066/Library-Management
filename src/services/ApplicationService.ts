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

    if (status === ApplicationStatus.APPROVED) {
      const book = await Book.findById(application.bookId);
      if (!book) {
        throw new ApiError(
          "Associated book not found",
          HttpStatusCode.NOT_FOUND,
        );
      }

      if (book.quantity < application.quantity) {
        throw new ApiError(
          `Insufficient book quantity. Available: ${book.quantity}, Requested: ${application.quantity}`,
          HttpStatusCode.BAD_REQUEST,
        );
      }

      book.quantity -= application.quantity;
      await book.save();
    }

    application.status = status;
    application.updatedBy = adminId as unknown as mongoose.Types.ObjectId;
    await application.save();

    return application;
  }

  static async deleteApplication(applicationId: string) {
    const application = await Application.findById(applicationId);
    if (!application) {
      throw new ApiError("Application not found", HttpStatusCode.NOT_FOUND);
    }

    if (application.status !== ApplicationStatus.PENDING) {
      throw new ApiError(
        "Only pending applications can be cancelled",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    await application.deleteOne();
    return { message: "Application cancelled successfully" };
  }

  static async updateApplication({
    applicationId,
    quantity,
    fromDate,
    toDate,
  }: {
    applicationId: string;
    quantity: number;
    fromDate: string;
    toDate: string;
  }) {
    const application = await Application.findById(applicationId);
    if (!application) {
      throw new ApiError("Application not found", HttpStatusCode.NOT_FOUND);
    }

    if (application.status !== ApplicationStatus.PENDING) {
      throw new ApiError(
        "Only pending applications can be updated",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    application.quantity = quantity;
    application.fromDate = new Date(fromDate);
    application.toDate = new Date(toDate);

    await application.save();
    return application;
  }
}
