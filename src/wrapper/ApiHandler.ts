import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import { HttpStatusCode } from "@/constant/enum/HttpStatusCode";
import { ApiError } from "./ApiError";

// Make it generic over the route params type
type ApiFunction<Params extends Record<string, string> = {}> = (
  req: NextRequest,
  context?: { params?: Params }
) => Promise<any>;

export const apiHandler = <Params extends Record<string, string> = {}>(
  handler: ApiFunction<Params>
) => {
  return async (req: NextRequest, context?: { params?: Params }) => {
    try {
      await connectDB();

      const result = await handler(req, context);

      const status = result?.status || HttpStatusCode.OK;

      const response = NextResponse.json(
        {
          status,
          data: result.data || result,
          message: result.message,
        },
        { status }
      );

      if ("token" in result) {
        response.cookies.set({
          name: "auth_token",
          value: result.token,
          httpOnly: true,
          maxAge: result.token === "" ? 0 : undefined,
          path: "/",
        });
      }

      return response;
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
