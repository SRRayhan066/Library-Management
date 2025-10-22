import Api from "@/utils/Api";

export const getStudentApi = (email: string) => {
  return Api.GET(`/api/student/${email}`);
};
