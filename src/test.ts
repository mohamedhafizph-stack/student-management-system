import { Admin } from "./models/Admin";
import { Student } from "./models/Student";
import { User } from "./models/User";

const admin = new Admin(
    "1",
    "Hafiz",
    "admin@gmail.com",
    "admin123"
);

const student = new Student(
    "2",
    "Rahul",
    "rahul@gmail.com",
    "student123",
    "Computer Science",
    20
);

const users: User[] = [admin, student];

users.forEach((user) => {
    console.log("----------------------");

    console.log("Name:", user.getName());
    console.log("Email:", user.getEmail());
    console.log("Role:", user.getRole());
    console.log("Permissions:", user.getPermissions());
});