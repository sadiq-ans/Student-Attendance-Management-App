
import { useEffect, useState } from "react";
import "./App.css";

const STORAGE_KEY = "studentAttendanceRecords";

const initialForm = {
  rollNo: "",
  studentName: "",
  course: "",
  lectureTime: "",
  attendance: "Present",
  feedback: "Good",
};

const courses = [
  "English",
  "Maths",
  "Science",
  "Social Studies",
  "Computer",
  "History",
];

const feedbackOptions = [
  "Excellent",
  "Very Good",
  "Good",
  "Bad",
];

function loadRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function App() {
  const [records, setRecords] = useState(loadRecords);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // Save records whenever the data changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const rollNo = form.rollNo.trim();
    const studentName = form.studentName.trim();

    if (!rollNo || !studentName || !form.course || !form.lectureTime) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prevent duplicate roll numbers for different records.
    const duplicate = records.some(
      (record) =>
        record.rollNo.toLowerCase() === rollNo.toLowerCase() &&
        record.id !== editingId
    );

    if (duplicate) {
      alert("This roll number already exists.");
      return;
    }

    if (editingId !== null) {
      setRecords((previous) =>
        previous.map((record) =>
          record.id === editingId
            ? { ...form, rollNo, studentName, id: editingId }
            : record
        )
      );
    } else {
      const newRecord = {
        ...form,
        rollNo,
        studentName,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      };

      setRecords((previous) => [newRecord, ...previous]);
    }

    resetForm();
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function handleEdit(record) {
    setForm({
      rollNo: record.rollNo,
      studentName: record.studentName,
      course: record.course,
      lectureTime: record.lectureTime,
      attendance: record.attendance,
      feedback: record.feedback,
    });

    setEditingId(record.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmed) return;

    setRecords((previous) =>
      previous.filter((record) => record.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  }

  const filteredRecords = records.filter((record) => {
    const query = search.trim().toLowerCase();

    return (
      record.rollNo.toLowerCase().includes(query) ||
      record.studentName.toLowerCase().includes(query) ||
      record.course.toLowerCase().includes(query)
    );
  });

  const presentCount = records.filter(
    (record) => record.attendance === "Present"
  ).length;

  const absentCount = records.filter(
    (record) => record.attendance === "Absent"
  ).length;

  return (
    <main className="app-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">STUDENT MANAGEMENT</p>
          <h1>Attendance Dashboard</h1>
          <p className="subtitle">
            Manage student attendance and feedback in one place.
          </p>
        </div>

        <div className="storage-label">
          <span className="storage-dot"></span>
          Saved in this browser
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Records</span>
          <strong>{records.length}</strong>
        </div>

        <div className="stat-card present-stat">
          <span className="stat-label">Present</span>
          <strong>{presentCount}</strong>
        </div>

        <div className="stat-card absent-stat">
          <span className="stat-label">Absent</span>
          <strong>{absentCount}</strong>
        </div>
      </section>

      <section className="panel form-panel">
        <div className="panel-heading">
          <div>
            <h2>{editingId ? "Edit Student Record" : "Add Student Record"}</h2>
            <p>
              {editingId
                ? "Update the selected student's details."
                : "Enter the student details below."}
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              className="button button-secondary"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="rollNo">Roll Number *</label>
              <input
                id="rollNo"
                name="rollNo"
                type="text"
                placeholder="e.g. 101"
                value={form.rollNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="studentName">Student Name *</label>
              <input
                id="studentName"
                name="studentName"
                type="text"
                placeholder="Enter student name"
                value={form.studentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="course">Course *</label>
              <select
                id="course"
                name="course"
                value={form.course}
                onChange={handleChange}
                required
              >
                <option value="">Select course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="lectureTime">Lecture Time *</label>
              <input
                id="lectureTime"
                name="lectureTime"
                type="time"
                value={form.lectureTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="attendance">Attendance *</label>
              <select
                id="attendance"
                name="attendance"
                value={form.attendance}
                onChange={handleChange}
                required
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="feedback">Feedback *</label>
              <select
                id="feedback"
                name="feedback"
                value={form.feedback}
                onChange={handleChange}
                required
              >
                {feedbackOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="button button-secondary" onClick={resetForm}>
              Clear Form
            </button>

            <button type="submit" className="button button-primary">
              {editingId ? "Update Record" : "+ Add Record"}
            </button>
          </div>
        </form>
      </section>

      <section className="panel records-panel">
        <div className="panel-heading records-heading">
          <div>
            <h2>Student Records</h2>
            <p>{filteredRecords.length} record(s) found</p>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search by roll no, name, course..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search student records"
          />
        </div>

        {filteredRecords.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">▤</div>
            <h3>{records.length ? "No matching records" : "No records yet"}</h3>
            <p>
              {records.length
                ? "Try a different search term."
                : "Add your first student using the form above."}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Roll No.</th>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Lecture Time</th>
                  <th>Attendance</th>
                  <th>Feedback</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="roll-cell">{record.rollNo}</td>
                    <td className="name-cell">{record.studentName}</td>
                    <td>{record.course}</td>
                    <td>{record.lectureTime}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          record.attendance === "Present"
                            ? "status-present"
                            : "status-absent"
                        }`}
                      >
                        {record.attendance}
                      </span>
                    </td>
                    <td>
                      <span className="feedback-badge">
                        {record.feedback}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="button button-edit"
                          onClick={() => handleEdit(record)}
                          aria-label={`Edit ${record.studentName}`}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="button button-delete"
                          onClick={() => handleDelete(record.id)}
                          aria-label={`Delete ${record.studentName}`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="page-footer">
        Student Attendance App · Data stored locally in your browser
      </footer>
    </main>
  );
}

export default App;