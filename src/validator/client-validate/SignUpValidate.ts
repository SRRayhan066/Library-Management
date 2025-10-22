import { SignUpFormField } from "@/constant/form-field/SignUpFormField";

const validateEmail = {};

const validateName = {};

const validateStudentId = {};

const validateDeparment = {};

const validatePassword = {};

const validateConfirmPassword = {};

const validationRules = {
  [SignUpFormField.EMAIL]: validateEmail,
  [SignUpFormField.NAME]: validateName,
  [SignUpFormField.STUDENT_ID]: validateStudentId,
  [SignUpFormField.DEPARTMENT]: validateDeparment,
  [SignUpFormField.PASSWORD]: validatePassword,
  [SignUpFormField.CONFIRM_PASSWORD]: validateConfirmPassword,
};

export const getValidationRules = (field: string) => {
  return validationRules[field] || {};
};
