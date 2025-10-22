import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { HttpStatusCode } from "@/constant/enum/HttpStatusCode";
import { ApiError } from "./ApiError";

type ApiFunction = (req: NextRequest) => Promise<any>;

export const apiHandler = (handler: ApiFunction) => {
  return async (req: NextRequest) => {
    try {
      await connectDB();

      const result = await handler(req);

      const status = result?.status || HttpStatusCode.OK;

      return NextResponse.json(
        {
          status,
          data: result.data || result,
          message: result.message,
        },
        { status }
      );
    } catch (error: any) {
      const statusCode =
        error instanceof ApiError
          ? error.statusCode
          : HttpStatusCode.INTERNAL_SERVER_ERROR;

      return NextResponse.json(
        {
          status: statusCode,
          error: error.message,
        },
        { status: statusCode }
      );
    }
  };
};
