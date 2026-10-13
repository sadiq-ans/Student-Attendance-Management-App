# Student Attendance Management App

A simple and responsive **Student Attendance Management System** built with React and Vite. The application allows users to add, view, search, edit, and delete student attendance records. All records are stored in the browser's Local Storage, so they remain available after refreshing the page.

## Features

* **Add Student Records** — Enter student details using a simple form.
* **View Student Records** — Display all records in a structured table.
* **Edit Records** — Update existing student information.
* **Delete Records** — Remove records with a confirmation prompt.
* **Search Records** — Search by roll number, student name, or course.
* **Local Storage** — Automatically save data in the browser.
* **Attendance Tracking** — Mark students as Present or Absent.
* **Feedback Management** — Record student feedback using predefined options.
* **Attendance Dashboard** — View total records, present students, and absent students.
* **Form Validation** — Validate required fields and prevent duplicate roll numbers.
* **Responsive Design** — Works on desktop and mobile screens.

## Technologies Used

* React
* JavaScript (ES6+)
* Vite
* HTML5
* CSS3
* Browser Local Storage

## Form Fields

| Field        | Type       | Available Options                                          |
| ------------ | ---------- | ---------------------------------------------------------- |
| Roll Number  | Text input | Unique roll number                                         |
| Student Name | Text input | Student's full name                                        |
| Course       | Dropdown   | English, Maths, Science, Social Studies, Computer, History |
| Lecture Time | Time input | Select lecture time                                        |
| Attendance   | Dropdown   | Present, Absent                                            |
| Feedback     | Dropdown   | Excellent, Very Good, Good, Bad                            |

## Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm (included with Node.js)
* [Git](https://git-scm.com/) (optional, for version control)

### Installation

**1. Create the React project**

```bash
npm create vite@latest student-attendance -- --template react
```

**2. Navigate to the project directory**

```bash
cd student-attendance
```

**3. Install dependencies**

```bash
npm install
```

**4. Add the application code**

Replace the contents of the following files with the code from this project:

* `src/App.jsx`
* `src/App.css`
* `src/index.css`

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Project Structure

```text
student-attendance/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## How to Use

1. Open the application in your browser.
2. Enter the student's roll number and name.
3. Select a course from the dropdown.
4. Choose the lecture time.
5. Mark attendance as Present or Absent.
6. Select the appropriate feedback.
7. Click **Add Record** to save the student information.
8. Use the table to view, search, edit, or delete records.
9. Refresh the browser to verify that the records are retained.

## Local Storage

The application uses browser Local Storage to persist student records.

**Storage key:**

```javascript
studentAttendanceRecords
```

Records are stored as JSON data and automatically updated whenever a record is added, edited, or deleted.

### Important Notes

* Data is stored locally in the current browser and site origin.
* Records are not shared between different browsers or devices.
* Clearing browser site data may permanently remove saved records.
* This application does not use a backend server or cloud database.
* Avoid storing sensitive student information in Local Storage in a production environment.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the application for production |
| `npm run preview` | Preview the production build         |

## Future Improvements

Possible enhancements include:

* Export attendance records to CSV or Excel.
* Filter attendance by course and lecture time.
* Add attendance dates and calculate attendance percentages.
* Add student profile management.
* Add authentication and role-based access.
* Integrate a backend database for centralized storage.
* Add data import and backup functionality.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Open a pull request.

## License

This project is available for learning and educational purposes. You may adapt it for your own projects. Add a formal open-source license if you want to specify the permissions and conditions for reuse.

---

**Developed with React and Vite.**
