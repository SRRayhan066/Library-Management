export interface UserToken {
  userId: string;
  referenceId: string;
  userType: string;
  iat: number;
  exp: number;
}
