export default function Header({ classInfo }) {
  return (
    <header className="header">
      <div className="header-left">
        <p className="header-label">Class Dashboard</p>
        <h1 className="header-title">Class {classInfo.class}</h1>
        <p className="header-sub">
          Academic Year {classInfo.academicYear} &nbsp;·&nbsp; Class Teacher: {classInfo.classTeacher}
        </p>
      </div>
      <div className="header-stats">
        <div className="stat-pill">
          <span className="stat-value">{classInfo.totalStudents}</span>
          <span className="stat-label">Total Students</span>
        </div>
      </div>
    </header>
  );
}
