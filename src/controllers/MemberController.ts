import { MemberService } from "@/services/MemberService";

export class MemberController {
  static async createMember({
    email,
    password,
    userType,
  }: {
    email: string;
    password: string;
    userType?: string;
  }) {
    return MemberService.createUser({ email, password, userType });
  }
}
