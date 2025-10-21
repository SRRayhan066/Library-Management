import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/db";

type ApiFunction = (req: NextRequest) => Promise<any>;

export const apiHandler = (handler: ApiFunction) => {
  return async (req: NextRequest) => {
    try {
      await connectDB();

      const result = await handler(req);

      return NextResponse.json(
        { success: true, ...result },
        { status: result?.status || 200 }
      );
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json(
        { success: false, error: "Something went wrong" },
        { status: 500 }
      );
    }
  };
};
