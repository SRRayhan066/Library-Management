import Api from "@/utils/Api";

export const getStudentApi = (email: string) => {
  return Api.GET(`/api/student/${email}`);
};

export const signUpApi = () => {
  return Api.POST("/api/sign-up");
};

export const signInApi = () => {
  return Api.POST("/api/sign-in");
};

export const signOutApi = () => {
  return Api.POST("api/sign-out");
};
