import { UserRole } from "../interfaces/IUser";

export abstract class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    private _role: UserRole
  ) {}

  get role(): UserRole {
    return this._role;
  }

  protected changeRole(role: UserRole): void {
    this._role = role;
  }

  abstract getDashboardMessage(): string;
}