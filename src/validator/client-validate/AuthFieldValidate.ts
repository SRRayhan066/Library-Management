import { AuthField } from "@/constant/form-field/AuthField";

const validateEmail = {};

const validateName = {};

const validateStudentId = {};

const validateDeparment = {};

const validatePassword = {};

const validateConfirmPassword = {};

const validationRules = {
  [AuthField.EMAIL]: validateEmail,
  [AuthField.NAME]: validateName,
  [AuthField.STUDENT_ID]: validateStudentId,
  [AuthField.DEPARTMENT]: validateDeparment,
  [AuthField.PASSWORD]: validatePassword,
  [AuthField.CONFIRM_PASSWORD]: validateConfirmPassword,
};

export const getValidationRules = (field: string) => {
  return validationRules[field] || {};
};
