import Validator from "validatorjs";
import { UserType } from "@/constant/enum/UserType";

export const validateMember = async (data: any) => {
  const rules = {
    email: "required|email",
    password: "required|string",
    userType: `in:${Object.values(UserType).join(",")}`,
  };

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    throw new Error(JSON.stringify(validation.errors.all()));
  }
};
