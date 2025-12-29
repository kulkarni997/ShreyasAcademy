import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  rollNumber?: string;
  courseName?: string;
  plan?: "1 Month" | "6 Months" | "16 Months";
  biologyMarks?: number;
  physicsMarks?: number;
  chemistryMarks?: number;
  totalMarks?: number;
  weeklyMarks?: Array<{
    week: number;
    date: Date;
    biologyMarks: number;
    physicsMarks: number;
    chemistryMarks: number;
    totalMarks: number;
    

  }>;
}


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [marksForm, setMarksForm] = useState({
    week: 1,
    biologyMarks: 0,
    physicsMarks: 0,
    chemistryMarks: 0,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/students", {
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/login");
        return;
      }

      const data = await response.json();
      setStudents(data.students);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch students", error);
      navigate("/login");
    }
  };

  const deleteStudent = async (id: string) => {
  if (!confirm("Delete this student permanently?")) return;

  const response = await fetch(`http://localhost:5000/admin/students/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.ok) {
    fetchStudents();
  } else {
    alert("Delete failed");
  }
};

  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  const openMarksModal = (student: Student) => {
    setSelectedStudent(student);
    
    // Calculate next week number based on existing weekly marks
    const nextWeek = student.weeklyMarks && student.weeklyMarks.length > 0
      ? Math.max(...student.weeklyMarks.map(m => m.week)) + 1
      : 1;
    
    setMarksForm({
      week: nextWeek,
      biologyMarks: 0,
      physicsMarks: 0,
      chemistryMarks: 0,
    });
    setShowMarksModal(true);
  };

  const getRankForWeek = (week: number, studentId: string) => {
  const studentsWithWeek = students.filter(s =>
    s.weeklyMarks?.some(w => w.week === week)
  );

  const sorted = studentsWithWeek.sort((a, b) => {
    const aMarks = a.weeklyMarks?.find(w => w.week === week)?.totalMarks || 0;
    const bMarks = b.weeklyMarks?.find(w => w.week === week)?.totalMarks || 0;
    return bMarks - aMarks;
  });

  return sorted.findIndex(s => s._id === studentId) + 1;
};


  const handleMarksSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent) return;

    try {
      const response = await fetch(
        `http://localhost:5000/admin/students/${selectedStudent._id}/marks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(marksForm),
        }
      );

      if (response.ok) {
        alert(`✅ Week ${marksForm.week} marks added successfully!`);
        setShowMarksModal(false);
        fetchStudents(); // Refresh list
      } else {
        const data = await response.json();
        alert(data.message || "Failed to update marks");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating marks");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading Mentor Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>🎓 Mentor Dashboard - Shreyas Academy</h1>
          <p style={{ color: '#666', margin: '5px 0 0 0' }}>
            Manage your students and track their weekly progress
          </p>
        </div>
        <button onClick={handleLogout} className="admin-logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-number">{students.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Courses</h3>
         <p className="stat-number">
  {
    new Set(
      students.flatMap(s => s.weeklyMarks?.map(w => w.week) || [])
    ).size
  }
</p>

        </div>
        <div className="stat-card">
          <h3>Total Weekly Tests</h3>
          <p className="stat-number">
            {students.reduce((sum, s) => sum + (s.weeklyMarks?.length || 0), 0)}
          </p>
        </div>
      </div>

      <div className="students-table-container">
        <h2>📊 Student Performance Overview</h2>
        <table className="students-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Plan</th>
              <th>Biology</th>
              <th>Physics</th>
              <th>Chemistry</th>
              <th>Total</th>
              <th>Tests Taken</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '30px' }}>
                  No students enrolled yet
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.rollNumber || "N/A"}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.courseName || "Not enrolled"}</td>
                  <td>{student.plan || "1 Month"}</td>
                  {/* <td>{student.biologyMarks || 0}/360</td>
                  <td>{student.physicsMarks || 0}/180</td>
                  <td>{student.chemistryMarks || 0}/180</td>
                  <td><strong>{student.totalMarks || 0}/720</strong></td> */}

                  <td>{student.weeklyMarks?.slice(-1)[0]?.biologyMarks || 0}/360</td>
<td>{student.weeklyMarks?.slice(-1)[0]?.physicsMarks || 0}/180</td>
<td>{student.weeklyMarks?.slice(-1)[0]?.chemistryMarks || 0}/180</td>
<td>
  <strong>
    {student.weeklyMarks?.slice(-1)[0]?.totalMarks || 0}/720
  </strong>
</td>

                  <td>{student.weeklyMarks?.length || 0} weeks</td>
                  <td>
                    <button
                      onClick={() => openMarksModal(student)}
                      className="update-btn"
                    >
                      📝 Add Weekly Marks
                    </button>

                    <button
  onClick={() => deleteStudent(student._id)}
  className="delete-btn"
>
  🗑 Remove
</button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showMarksModal && selectedStudent && (
        <div className="modal-overlay" onClick={() => setShowMarksModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>📝 Add Week {marksForm.week} Marks for {selectedStudent.name}</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Total tests completed: <strong>{selectedStudent.weeklyMarks?.length || 0} weeks</strong>
            </p>

            <table className="weekly-table">
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
    {selectedStudent.weeklyMarks?.map((w) => (
      <tr key={w.week}>
        <td>{w.week}</td>
        <td>{w.biologyMarks}</td>
        <td>{w.physicsMarks}</td>
        <td>{w.chemistryMarks}</td>
        <td><strong>{w.totalMarks}</strong></td>
        <td>{getRankForWeek(w.week, selectedStudent._id)}</td>
      </tr>
    ))}
  </tbody>
</table>

            {selectedStudent.weeklyMarks?.map(w => (
  <p key={w.week}>
    Week {w.week} Rank: <strong>{getRankForWeek(w.week, selectedStudent._id)}</strong>
  </p>
))}

            <form onSubmit={handleMarksSubmit}>
              <div className="form-group">
                <label>Week Number</label>
                <input
                  type="number"
                  min="1"
                  value={marksForm.week}
                  onChange={(e) =>
                    setMarksForm({
                      ...marksForm,
                      week: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Biology Marks (out of 360)</label>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={marksForm.biologyMarks}
                  onChange={(e) =>
                    setMarksForm({
                      ...marksForm,
                      biologyMarks: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Physics Marks (out of 180)</label>
                <input
                  type="number"
                  min="0"
                  max="180"
                  value={marksForm.physicsMarks}
                  onChange={(e) =>
                    setMarksForm({
                      ...marksForm,
                      physicsMarks: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Chemistry Marks (out of 180)</label>
                <input
                  type="number"
                  min="0"
                  max="180"
                  value={marksForm.chemistryMarks}
                  onChange={(e) =>
                    setMarksForm({
                      ...marksForm,
                      chemistryMarks: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  Total: {marksForm.biologyMarks + marksForm.physicsMarks + marksForm.chemistryMarks} / 720
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  ✅ Save Week {marksForm.week} Marks
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
      )}
    </div>
  );
};

export default AdminDashboard;