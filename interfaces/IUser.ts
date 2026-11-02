export type UserRole = "admin" | "student";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type RegisterRequest = Pick<IUser, "name" | "email" | "password">;
export type PublicUser = Readonly<Omit<IUser, "password">>;
export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  user: PublicUser;
}