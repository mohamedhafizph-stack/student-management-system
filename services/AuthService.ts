import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { RegisterRequest, LoginRequest, AuthResponse, PublicUser } from "../interfaces/IUser";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/generateToken";

export class AuthService {
  async register(input: RegisterRequest): Promise<AuthResponse> {
    const exists = await UserModel.findOne({ email: input.email });
    if (exists) throw new AppError("Email is already registered", 409);

    const password = await bcrypt.hash(input.password, 12);
    const user = await UserModel.create({ ...input, password, role: "student" });
    const publicUser = {
      _id: user.id, name: user.get("name"), email: user.get("email"), role: user.get("role")
    } as PublicUser;
    return { token: generateToken(user.id, "student"), user: publicUser };
  }

  async login(input: LoginRequest): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email: input.email }).select("+password");
    if (!user || !(await bcrypt.compare(input.password, user.get("password")))) {
      throw new AppError("Invalid email or password", 401);
    }
    const publicUser = {
      _id: user.id, name: user.get("name"), email: user.get("email"), role: user.get("role")
    } as PublicUser;
    return { token: generateToken(user.id, user.get("role")), user: publicUser };
  }
}