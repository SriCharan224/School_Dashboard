function getAverage(subjects) {
  const values = Object.values(subjects);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

function getPerformanceBadge(avg) {
  if (avg >= 90) return { label: "Excellent", cls: "badge badge-blue" };
  if (avg >= 75) return { label: "Good", cls: "badge badge-green" };
  if (avg >= 60) return { label: "Average", cls: "badge badge-amber" };
  return { label: "Needs Attention", cls: "badge badge-red" };
}

function getAttendanceColor(pct) {
  if (pct >= 90) return "#16A34A";
  if (pct >= 75) return "#D97706";
  return "#DC2626";
}

export default function StudentTable({ students, onSelect }) {
  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Student Name</th>
            <th>Attendance</th>
            <th>Avg. Marks</th>
            <th>Performance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const avg = getAverage(student.subjects);
            const badge = getPerformanceBadge(avg);
            return (
              <tr key={student.id} onClick={() => onSelect(student)} className="table-row">
                <td className="roll-cell">{student.rollNumber}</td>
                <td className="name-cell">{student.name}</td>
                <td>
                  <span style={{ color: getAttendanceColor(student.attendance), fontWeight: 600 }}>
                    {student.attendance}%
                  </span>
                </td>
                <td className="marks-cell">{avg}/100</td>
                <td>
                  <span className={badge.cls}>{badge.label}</span>
                </td>
                <td>
                  <button className="view-btn" onClick={() => onSelect(student)}>
                    View →
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
