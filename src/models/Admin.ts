import { User } from "./User";

export class Admin extends User {

    constructor(
        id: string,
        name: string,
        email: string,
        password: string
    ) {
        super(id, name, email, password, "ADMIN");
    }

    public getPermissions(): string[] {
        return [
            "CREATE_STUDENT",
            "UPDATE_STUDENT",
            "DELETE_STUDENT",
            "VIEW_STUDENTS",
            "MANAGE_COURSES"
        ];
    }
}