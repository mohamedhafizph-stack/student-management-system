import { User } from "./User";

export class Student extends User {
  constructor(id: string, name: string, email: string, public studentId: string) {
    super(id, name, email, "student");
  }

  getDashboardMessage(): string {
    return `Welcome ${this.name}. View your courses, attendance and marks.`;
  }
}