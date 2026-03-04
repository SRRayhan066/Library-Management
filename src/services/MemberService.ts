import Member from "@/model/Member";
import Student from "@/model/Student";
import { UserType } from "@/constant/enum/UserType";
import { jsonObject } from "@/utils/CommonUtils";

export class MemberService {
  static async getAllMembers() {
    const members = await Member.find({
      userType: { $ne: UserType.ADMIN },
    }).populate({ path: "referenceId", model: Student });

    return jsonObject(members);
  }
}
