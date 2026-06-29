import { useState, useEffect } from "react";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import StudentCard from "./components/StudentCard";
import "./App.css";

export default function App() {
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [filterPerformance, setFilterPerformance] = useState("all");

  useEffect(() => {
    fetch("/data/students.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load student data.");
        return res.json();
      })
      .then((data) => {
        setClassData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="state-screen">Loading class data...</div>;
  if (error) return <div className="state-screen error">Error: {error}</div>;

  function getAvg(subjects) {
    const vals = Object.values(subjects);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }

  const filteredStudents = classData.students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase());

    const avg = getAvg(s.subjects);
    const matchFilter =
      filterPerformance === "all" ||
      (filterPerformance === "excellent" && avg >= 90) ||
      (filterPerformance === "good" && avg >= 75 && avg < 90) ||
      (filterPerformance === "average" && avg >= 60 && avg < 75) ||
      (filterPerformance === "attention" && avg < 60);

    return matchSearch && matchFilter;
  });

  // Class-level stats
  const allAvgs = classData.students.map((s) => getAvg(s.subjects));
  const classAvg = Math.round(allAvgs.reduce((a, b) => a + b, 0) / allAvgs.length);
  const highAttendance = classData.students.filter((s) => s.attendance >= 90).length;
  const needsAttention = classData.students.filter((s) => getAvg(s.subjects) < 60).length;

  return (
    <div className="app">
      <Header classInfo={classData} />

      {/* Class-level summary bar */}
      <div className="summary-bar">
        <div className="summary-stat">
          <span className="sstat-value">{classAvg}</span>
          <span className="sstat-label">Class Average</span>
        </div>
        <div className="summary-stat">
          <span className="sstat-value">{highAttendance}</span>
          <span className="sstat-label">Above 90% Attendance</span>
        </div>
        <div className="summary-stat">
          <span className="sstat-value" style={{ color: needsAttention > 0 ? "#DC2626" : "#16A34A" }}>
            {needsAttention}
          </span>
          <span className="sstat-label">Need Attention</span>
        </div>
        <div className="summary-stat">
          <span className="sstat-value">{filteredStudents.length}</span>
          <span className="sstat-label">Showing</span>
        </div>
      </div>

      {/* Filters */}
      <div className="controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or roll number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterPerformance}
          onChange={(e) => setFilterPerformance(e.target.value)}
        >
          <option value="all">All Performance</option>
          <option value="excellent">Excellent (90+)</option>
          <option value="good">Good (75-89)</option>
          <option value="average">Average (60-74)</option>
          <option value="attention">Needs Attention (below 60)</option>
        </select>
      </div>

      {/* Table */}
      {filteredStudents.length === 0 ? (
        <div className="state-screen">No students match your search or filter.</div>
      ) : (
        <StudentTable students={filteredStudents} onSelect={setSelectedStudent} />
      )}

      {/* Student detail card (modal) */}
      {selectedStudent && (
        <StudentCard student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}
