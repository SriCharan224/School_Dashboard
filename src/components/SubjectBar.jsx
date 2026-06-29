export default function SubjectBar({ subject, marks }) {
  const getColor = (marks) => {
    if (marks >= 90) return "#2563EB";   // blue - excellent
    if (marks >= 75) return "#16A34A";   // green - good
    if (marks >= 60) return "#D97706";   // amber - average
    return "#DC2626";                     // red - needs attention
  };

  const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    return "D";
  };

  return (
    <div className="subject-bar-row">
      <span className="subject-name">{subject}</span>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{
            width: `${marks}%`,
            backgroundColor: getColor(marks),
          }}
        />
      </div>
      <span className="subject-marks">{marks}</span>
      <span className="subject-grade" style={{ color: getColor(marks) }}>
        {getGrade(marks)}
      </span>
    </div>
  );
}
