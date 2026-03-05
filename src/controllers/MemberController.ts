import { NextRequest } from "next/server";
import { MemberService } from "@/services/MemberService";
import { HttpStatusCode } from "@/constant/enum/HttpStatusCode";
import { MESSAGE } from "@/lib/message";

export class MemberController {
  static async getAllMembers() {
    const members = await MemberService.getAllMembers();

    return {
      status: HttpStatusCode.OK,
      data: members,
      message: MESSAGE.API.GET_MEMBERS || "Members fetched successfully",
    };
  }

  static async getMemberDetails(
    req: NextRequest,
    context: { params: { id: string } },
  ) {
    const { id } = await context.params;

    if (!id) {
      return {
        status: HttpStatusCode.BAD_REQUEST,
        message: "Member Registration Number is required",
      };
    }

    const memberDetails = await MemberService.getMemberByRegNo(id);

    if (!memberDetails) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        message: "Member not found",
      };
    }

    const history = await MemberService.getMemberHistory(memberDetails._id);

    return {
      status: HttpStatusCode.OK,
      data: {
        ...memberDetails,
        history,
      },
      message: "Member details fetched successfully",
    };
  }
}
