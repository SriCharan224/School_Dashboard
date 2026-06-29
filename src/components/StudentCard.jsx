import SubjectBar from "./SubjectBar";

function getAverage(subjects) {
  const values = Object.values(subjects);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

function getAttendanceStatus(pct) {
  if (pct >= 90) return { label: "Good", color: "#16A34A" };
  if (pct >= 75) return { label: "Moderate", color: "#D97706" };
  return { label: "Low", color: "#DC2626" };
}

export default function StudentCard({ student, onClose }) {
  const avg = getAverage(student.subjects);
  const attStatus = getAttendanceStatus(student.attendance);

  return (
    <div className="card-overlay" onClick={onClose}>
      <div className="student-card" onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <div>
            <p className="card-roll">{student.rollNumber}</p>
            <h2 className="card-name">{student.name}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="card-summary">
          <div className="summary-item">
            <span className="summary-label">Attendance</span>
            <span className="summary-value" style={{ color: attStatus.color }}>
              {student.attendance}%
            </span>
            <span className="summary-tag" style={{ color: attStatus.color }}>
              {attStatus.label}
            </span>
          </div>
          <div className="summary-divider" />
          <div className="summary-item">
            <span className="summary-label">Average Marks</span>
            <span className="summary-value">{avg}</span>
            <span className="summary-tag">out of 100</span>
          </div>
        </div>

        <div className="card-subjects">
          <p className="section-label">Subject Performance</p>
          {Object.entries(student.subjects).map(([subject, marks]) => (
            <SubjectBar key={subject} subject={subject} marks={marks} />
          ))}
        </div>
      </div>
    </div>
  );
}
