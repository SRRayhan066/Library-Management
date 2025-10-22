import { NextRequest } from "next/server";
import { apiHandler } from "@/wrapper/ApiHandler";
import { validateMember } from "@/validator/server-validate/MemberValidate";
import { MemberController } from "@/controllers/MemberController";
import { HttpStatusCode } from "@/constant/enum/HttpStatusCode";
import { MESSAGE } from "@/lib/message";

export const GET = apiHandler(async (req: NextRequest) => {
  return { message: "API is working perfectly" };
});

export const POST = apiHandler(async (req: NextRequest) => {
  const reqBody = await req.json();
  await validateMember(reqBody);
  const member = await MemberController.createMember(reqBody);
  return {
    data: member,
    status: HttpStatusCode.CREATED,
    message: MESSAGE.API.USER_CREATED,
  };
});
