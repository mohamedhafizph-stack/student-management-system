const API_URL = "/api";

const loginPage = document.getElementById("loginPage");
const appContainer = document.querySelector(".app-container");
const loginForm = document.getElementById("loginForm");

const dashboardPage = document.getElementById("dashboardPage");
const studentsPage = document.getElementById("studentsPage");
const coursesPage = document.getElementById("coursesPage");

const pageTitle = document.getElementById("pageTitle");

const studentModal = document.getElementById("studentModal");
const studentForm = document.getElementById("studentForm");

let authToken = localStorage.getItem("authToken");

// ==========================================
// AUTHENTICATION SCREEN
// ==========================================

function updateAuthScreen() {
    if (authToken) {
        loginPage.classList.add("hidden");
        appContainer.style.display = "flex";
        loadDashboard();
    } else {
        loginPage.classList.remove("hidden");
        appContainer.style.display = "none";
    }
}

// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    const errorElement = document.getElementById("loginError");
    errorElement.textContent = "";

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: document.getElementById("loginEmail").value.trim(),
                password: document.getElementById("loginPassword").value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        authToken = data.token;

        localStorage.setItem("authToken", authToken);

        updateAuthScreen();

    } catch (error) {
        errorElement.textContent = error.message;
    }
});

// ==========================================
// API REQUEST HELPER
// ==========================================

async function apiRequest(endpoint, options = {}) {

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            ...options.headers
        }
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 401) {

        localStorage.removeItem("authToken");

        authToken = null;

        updateAuthScreen();

        throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

// ==========================================
// EXTRACT API RESPONSE
// ==========================================

function extractItems(data) {

    if (Array.isArray(data)) {
        return data;
    }

    return (
        data.students ||
        data.courses ||
        data.data ||
        data.results ||
        []
    );
}

// ==========================================
// NAVIGATION
// ==========================================

function showPage(page) {

    dashboardPage.classList.add("hidden");
    studentsPage.classList.add("hidden");
    coursesPage.classList.add("hidden");

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    if (page === "dashboard") {

        dashboardPage.classList.remove("hidden");

        pageTitle.textContent = "Dashboard Overview";

        loadDashboard();
    }

    if (page === "students") {

        studentsPage.classList.remove("hidden");

        pageTitle.textContent = "Student Management";

        loadStudents();
    }

    if (page === "courses") {

        coursesPage.classList.remove("hidden");

        pageTitle.textContent = "Course Management";

        loadCourses();
    }

    document.querySelectorAll(`[data-page="${page}"]`).forEach(link => {

        if (link.classList.contains("nav-link")) {
            link.classList.add("active");
        }

    });
}

document.querySelectorAll("[data-page]").forEach(element => {

    element.addEventListener("click", event => {

        event.preventDefault();

        showPage(element.dataset.page);

    });

});

// ==========================================
// DASHBOARD
// ==========================================

async function loadDashboard() {

    try {

        const [studentResponse, courseResponse] = await Promise.all([

            apiRequest("/students"),

            apiRequest("/courses")

        ]);

        const students = extractItems(studentResponse);

        const courses = extractItems(courseResponse);

        document.getElementById("totalStudents").textContent =
            students.length;

        document.getElementById("totalCourses").textContent =
            courses.length;

        // const active = students.filter(student =>
        //     student.status?.toLowerCase() === "active" ||
        //     student.isActive === true
        // );

        // document.getElementById("activeStudents").textContent =
        //     active.length;

        document.getElementById("activeStudents").textContent =
    students.length;

        const recent = students.slice(-5).reverse();

        document.getElementById("recentStudents").textContent =
            recent.length;

        renderStudentsTable(
            recent,
            document.getElementById("recentStudentsTable"),
            false
        );

    } catch (error) {

        console.error("Dashboard error:", error);

        showMessage(error.message);

    }
}

// ==========================================
// STUDENTS
// ==========================================

async function loadStudents() {

    const table = document.getElementById("studentsTable");

    try {

        const response = await apiRequest("/students");

        const students = extractItems(response);

        renderStudentsTable(students, table, true);

    } catch (error) {

        console.error("Students error:", error);

        table.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    ${escapeHTML(error.message)}
                </td>
            </tr>
        `;

    }
}

// ==========================================
// RENDER STUDENT TABLE
// ==========================================

function renderStudentsTable(students, table, showActions) {

    if (!students.length) {

        table.innerHTML = `
            <tr>
                <td colspan="${showActions ? 5 : 4}" class="empty-state">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }

    table.innerHTML = students.map(student => {

        const user = student.userId && typeof student.userId === "object"
            ? student.userId
            : {};

        const name =
            student.name ||
            student.fullName ||
            user.name ||
            "Unnamed";

        const email =
            student.email ||
            user.email ||
            "N/A";

        const phone =
            student.phone ||
            student.phoneNumber ||
            "N/A";

        const status = student.status || "Active";

        return `
            <tr>

                <td>
                    <strong>${escapeHTML(name)}</strong>
                </td>

                <td>
                    ${escapeHTML(email)}
                </td>

                <td>
                    ${escapeHTML(phone)}
                </td>

                <td>
                    <span class="status-badge">
                        ${escapeHTML(status)}
                    </span>
                </td>

                ${
                    showActions
                        ? `
                            <td>
                                <button
                                    class="secondary-button"
                                    onclick="deleteStudent('${student._id}')"
                                >
                                    Delete
                                </button>
                            </td>
                        `
                        : ""
                }

            </tr>
        `;

    }).join("");

}

// ==========================================
// COURSES
// ==========================================

async function loadCourses() {

    const table = document.getElementById("coursesTable");

    try {

        const response = await apiRequest("/courses");

        const courses = extractItems(response);

        if (!courses.length) {

            table.innerHTML = `
                <tr>
                    <td colspan="3" class="empty-state">
                        No courses found.
                    </td>
                </tr>
            `;

            return;
        }

        table.innerHTML = courses.map(course => `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(course.name || course.title || "Unnamed")}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(course.description || "N/A")}
                </td>

                <td>
                    ${
                        course.createdAt
                            ? new Date(course.createdAt).toLocaleDateString()
                            : "N/A"
                    }
                </td>

            </tr>

        `).join("");

    } catch (error) {

        console.error("Courses error:", error);

        table.innerHTML = `
            <tr>
                <td colspan="3" class="empty-state">
                    ${escapeHTML(error.message)}
                </td>
            </tr>
        `;

    }
}

// ==========================================
// ADD STUDENT MODAL
// ==========================================

function openStudentModal() {

    studentModal.classList.remove("hidden");

}

function closeStudentModal() {

    studentModal.classList.add("hidden");

    studentForm.reset();

}

document.getElementById("addStudentBtn")
    .addEventListener("click", openStudentModal);

document.getElementById("studentsAddBtn")
    .addEventListener("click", openStudentModal);

document.getElementById("closeModal")
    .addEventListener("click", closeStudentModal);

document.getElementById("cancelModal")
    .addEventListener("click", closeStudentModal);

// ==========================================
// ADD STUDENT
// ==========================================

studentForm.addEventListener("submit", async event => {

    event.preventDefault();

    const name =
        document.getElementById("studentName").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const password =
        document.getElementById("studentPassword").value;

    const studentId =
        document.getElementById("studentId").value.trim();

    const department =
        document.getElementById("studentDepartment").value.trim();

    const semester =
        Number(document.getElementById("studentSemester").value);

    const phone =
        document.getElementById("studentPhone").value.trim();

    try {

        // STEP 1: CREATE USER ACCOUNT

        const registerResponse = await fetch("/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name,
                email,
                password

            })

        });

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {

            throw new Error(
                registerData.message || "User registration failed"
            );

        }

        // STEP 2: GET USER ID

        const userId =
            registerData.user?.id ||
            registerData.user?._id;

        if (!userId) {

            console.error("Registration response:", registerData);

            throw new Error(
                "User created, but User ID was not returned."
            );

        }

        // STEP 3: CREATE STUDENT PROFILE

        await apiRequest("/students", {

            method: "POST",

            body: JSON.stringify({

                userId: userId,

                studentId: studentId,

                department: department,

                semester: semester,

                phone: phone

            })

        });

        // STEP 4: SUCCESS

        showMessage("Student added successfully!");

        closeStudentModal();

        await loadStudents();

        await loadDashboard();

    } catch (error) {

        console.error("Add student error:", error);

        showMessage(error.message);

    }

});

// ==========================================
// DELETE STUDENT
// ==========================================

async function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {

        return;

    }

    try {

        await apiRequest(`/students/${id}`, {

            method: "DELETE"

        });

        showMessage("Student deleted successfully!");

        await loadStudents();

        await loadDashboard();

    } catch (error) {

        showMessage(error.message);

    }

}

// ==========================================
// PREVENT HTML INJECTION
// ==========================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => ({

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#39;"

    })[character]);

}

// ==========================================
// MESSAGES
// ==========================================

function showMessage(message) {

    alert(message);

}

// ==========================================
// INITIAL SCREEN
// ==========================================

updateAuthScreen();