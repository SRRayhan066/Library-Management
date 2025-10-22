import { HttpStatusCode } from "@/constant/enum/HttpStatusCode";
import { MESSAGE } from "@/lib/message";
import Member from "@/model/Member";
import Student from "@/model/Student";
import { jsonObject } from "@/utils/CommonUtils";
import { ApiError } from "@/wrapper/ApiError";

export class MemberService {
  static async createUser({
    email,
    password,
    userType,
  }: {
    email: string;
    password: string;
    userType?: string;
  }) {
    const [student, member] = await Promise.all([
      Student.findOne({ email }),
      Member.findOne({ email }),
    ]);

    if (!student) {
      throw new ApiError(
        MESSAGE.API.ERROR.STUDENT_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    if (member) {
      throw new ApiError(
        MESSAGE.API.ERROR.MEMBER_ALREADY_EXIST,
        HttpStatusCode.CONFLICT
      );
    }

    const newMember = await Member.create({ email, password, userType });

    return jsonObject({
      email: newMember.email,
      userType: newMember.userType,
    });
  }
}
