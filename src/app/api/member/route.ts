import { NextRequest } from "next/server";
import { apiHandler } from "@/wrapper/ApiHandler";

export const GET = apiHandler(async (req: NextRequest) => {
  return { message: "API is working perfectly" };
});
