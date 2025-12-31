import { API_URL } from '../config/api';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";


/* ================= TYPES ================= */

interface WeeklyMark {
  week: number;
  date: string;
  biologyMarks: number;
  physicsMarks: number;
  chemistryMarks: number;
  totalMarks: number;
}

interface Student {
  _id: string;
  name: string;
  rollNumber?: string;
  plan?: "1 Month" | "6 Months" | "16 Months" | "One on One";
  mentorName?: string;
  mentorContactNumber?: string;
  weeklyMarks?: WeeklyMark[];
  rank:string | number
}

/* ================= COMPONENT ================= */

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showMarksModal, setShowMarksModal] = useState(false);

  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const [mentorForm, setMentorForm] = useState({
    mentorName: "",
    mentorContactNumber: "",
  });

  const [marksForm, setMarksForm] = useState({
    week: 1,
    biologyMarks: 0,
    physicsMarks: 0,
    chemistryMarks: 0,
    totalMarks: 0,
    rank:""
  });

  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    totalWeeklyTests: 0,
  });

  /* ================= FETCH ================= */

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/students`, {
        credentials: "include",
      });

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setStudents(data.students);
      setLoading(false);
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ================= STATS ================= */

  useEffect(() => {
    const totalStudents = students.length;

    const allWeeks = students.flatMap(
      (s) => s.weeklyMarks?.map((w) => w.week) || []
    );

    const uniqueWeeks = new Set(allWeeks).size;

    setStats({
      totalStudents,
      activeCourses: uniqueWeeks,
      totalWeeklyTests: uniqueWeeks,
    });
  }, [students]);

  /* ================= LOGOUT ================= */

 const handleLogout = async () => {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  navigate("/login");
};

  /* ================= MARKS ================= */

  const openMarksModal = (student: Student) => {
    setSelectedStudent(student);

    const nextWeek =
      student.weeklyMarks?.length
        ? Math.max(...student.weeklyMarks.map((m) => m.week)) + 1
        : 1;

    setMarksForm({
      week: nextWeek,
      biologyMarks: 0,
      physicsMarks: 0,
      chemistryMarks: 0,
      totalMarks: 0,
      rank:""
    });
    setShowMarksModal(true);
  };

  const handleMarksSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const res = await fetch(
      `${API_URL}/admin/students/${selectedStudent._id}/marks`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(marksForm),
      }
    );

    if (res.ok) {
      setShowMarksModal(false);
      fetchStudents();
    } else {
      alert("Failed to save marks");
    }
  };

  const renderMarksModal = () => {
    if (!selectedStudent) return null;

    const nextWeek = selectedStudent.weeklyMarks?.length
      ? Math.max(...selectedStudent.weeklyMarks.map((m) => m.week)) + 1
      : 1;

    const getRankForWeek = (week: number) => {
      if (!students.length) return 0;

      const weekMarks = students
        .map((s) => ({
          id: s._id,
          total: s.weeklyMarks?.find((m) => m.week === week)?.totalMarks || 0,
        }))
        .sort((a, b) => b.total - a.total);

      return weekMarks.findIndex((m) => m.id === selectedStudent._id) + 1;
    };

    return (
      <div
        className="modal-overlay"
        onClick={() => setShowMarksModal(false)}
      >
        <div
          className="marks-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>
            Add Week {nextWeek} Marks for {selectedStudent.name}
          </h2>
          <p className="test-count">
            Total tests completed: {selectedStudent.weeklyMarks?.length || 0} weeks
          </p>

          {selectedStudent.weeklyMarks?.length ? (
            <div className="marks-history">
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Week</th>
                    <th>Biology</th>
                    <th>Physics</th>
                    <th>Chemistry</th>
                    <th>Total</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {[...(selectedStudent.weeklyMarks || [])]
                    .sort((a, b) => b.week - a.week)
                    .map((week) => {
                      const rank = getRankForWeek(week.week);
                      return (
                        <tr key={week.week}>
                          <td>Week {week.week}</td>
                          <td>{week.biologyMarks}/360</td>
                          <td>{week.physicsMarks}/180</td>
                          <td>{week.chemistryMarks}/180</td>
                          <td>{week.totalMarks}/720</td>
                          <td>{rank === 1 ? "🏆 " : ""}{rank}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-marks">No tests recorded yet</div>
          )}

          <form onSubmit={handleMarksSubmit} className="marks-form">
            <h3>Add New Test</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Week Number</label>
                <input
                  type="number"
                  value={marksForm.week}
                  onChange={(e) =>
                    setMarksForm((prev) => ({
                      ...prev,
                      week: +e.target.value,
                    }))
                  }
                  min={nextWeek}
                  required
                />
              </div>
              <div className="form-group">
                <label>Biology (out of 360)</label>
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={marksForm.biologyMarks}
                  onChange={(e) => {
                    const bio = +e.target.value;
                    setMarksForm((prev) => ({
                      ...prev,
                      biologyMarks: bio,
                      totalMarks:
                        bio + prev.physicsMarks + prev.chemistryMarks,
                    }));
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label>Physics (out of 180)</label>
                <input
                  type="number"
                  min={0}
                  max={180}
                  value={marksForm.physicsMarks}
                  onChange={(e) => {
                    const phy = +e.target.value;
                    setMarksForm((prev) => ({
                      ...prev,
                      physicsMarks: phy,
                      totalMarks:
                        prev.biologyMarks + phy + prev.chemistryMarks,
                    }));
                  }}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Chemistry (out of 180)</label>
                <input
                  type="number"
                  min={0}
                  max={180}
                  value={marksForm.chemistryMarks}
                  onChange={(e) => {
                    const chem = +e.target.value;
                    setMarksForm((prev) => ({
                      ...prev,
                      chemistryMarks: chem,
                      totalMarks:
                        prev.biologyMarks + prev.physicsMarks + chem,
                    }));
                  }}
                  required
                />
              </div>
              <div className="form-group total-display">
                <label>Total</label>
                <div className="total-value">
                  {marksForm.totalMarks}/720
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Save Week {marksForm.week} Marks
              </button>
              <button
                type="button"
                onClick={() => setShowMarksModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
            
          </form>
        </div>
      </div>
    );
  };

  /* ================= MENTOR ================= */

  const openMentorModal = (student: Student) => {
    setSelectedStudentId(student._id);
    setMentorForm({
      mentorName: student.mentorName || "",
      mentorContactNumber: student.mentorContactNumber || "",
    });
    setShowMentorModal(true);
  };

  const handleMentorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    const res = await fetch(
     `${API_URL}/admin/students/${selectedStudentId}/mentor`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(mentorForm),
      }
    );

    if (res.ok) {
      setShowMentorModal(false);
      fetchStudents();
    } else {
      alert("Failed to update mentor");
    }
  };

  /* ================= DELETE STUDENT ================= */
  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently remove ${studentName}? This action cannot be undone.`
    );

    if (confirmDelete) {
      try {
        const res = await fetch(`${API_URL}/admin/students/${studentId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (res.ok) {
          setStudents((prev) => prev.filter((s) => s._id !== studentId));
          alert("Student removed successfully");
        } else {
          const errorData = await res.json();
          alert(errorData.message || "Failed to remove student");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  if (loading) return <h2>Loading...</h2>;

  /* ================= UI ================= */

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Mentor Dashboard</h1>
        <button onClick={handleLogout} className="admin-logout-btn">
          Logout
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Active Courses</h3>
          <p>{stats.activeCourses}</p>
        </div>
        <div className="stat-card">
          <h3>Total Weekly Tests</h3>
          <p>{stats.totalWeeklyTests}</p>
        </div>
      </div>

      {/* STUDENTS TABLE */}
      <table className="students-table">
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Mentor</th>
            <th>Plan</th>
            <th>Bio</th>
            <th>Phy</th>
            <th>Chem</th>
            <th>Total</th>
            <th>Tests</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
  {students.map((s) => (
    <tr key={s._id}>
      <td>{s.rollNumber || "N/A"}</td>
      <td>{s.name}</td>
      <td>
        {s.mentorName || "Not assigned"}
        <button onClick={() => openMentorModal(s)} className="edit-mentor-btn">
          ✏️
        </button>
      </td>
      <td>{s.plan || "1 Month"}</td>
      <td>{s.weeklyMarks?.slice(-1)[0]?.biologyMarks || 0}/360</td>
      <td>{s.weeklyMarks?.slice(-1)[0]?.physicsMarks || 0}/180</td>
      <td>{s.weeklyMarks?.slice(-1)[0]?.chemistryMarks || 0}/180</td>
      <td>
        <b>{s.weeklyMarks?.slice(-1)[0]?.totalMarks || 0}/720</b>
      </td>
      <td>{s.weeklyMarks?.length || 0}</td>
      <td className="actions-cell">
        <button onClick={() => openMarksModal(s)} className="add-marks-btn">
          Add Marks
        </button>
        {/* Trash Icon Button - Line 324 */}
        <button 
          onClick={() => handleDeleteStudent(s._id, s.name)} 
          className="remove-student-btn"
        >
          🗑️
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      {/* MARKS MODAL */}
      {showMarksModal && renderMarksModal()}

      {/* MENTOR MODAL */}
      {showMentorModal && (
        <div className="modal-overlay" onClick={() => setShowMentorModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleMentorSubmit}>
              <h3>Update Mentor</h3>
              <div className="form-group">
                <label>Mentor Name</label>
                <input
                  placeholder="Mentor Name"
                  value={mentorForm.mentorName}
                  onChange={(e) =>
                    setMentorForm({ ...mentorForm, mentorName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  placeholder="Contact"
                  value={mentorForm.mentorContactNumber}
                  onChange={(e) =>
                    setMentorForm({
                      ...mentorForm,
                      mentorContactNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowMentorModal(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
