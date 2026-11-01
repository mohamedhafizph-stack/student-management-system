import { User } from "./User";

export class Student extends User {

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        private course: string,
        private age: number
    ) {
        super(id, name, email, password, "STUDENT");
    }

    public getPermissions(): string[] {
        return [
            "VIEW_PROFILE",
            "VIEW_COURSES"
        ];
    }

    public getCourse(): string {
        return this.course;
    }

    public getAge(): number {
        return this.age;
    }

    public updateCourse(course: string): void {
        this.course = course;
    }
}