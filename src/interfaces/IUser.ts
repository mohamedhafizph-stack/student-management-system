import { User } from "../models/User";

export interface IUser {
    getUserById(id: string): User | undefined;
    getAllUsers(): User[];
    createUser(user: User): User;
}