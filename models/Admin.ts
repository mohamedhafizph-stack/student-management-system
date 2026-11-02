import { User } from "./User";

export class Admin extends User {
  constructor(id: string, name: string, email: string) {
    super(id, name, email, "admin");
  }

  getDashboardMessage(): string {
    return `Welcome ${this.name}. You can manage students and courses.`;
  }
}