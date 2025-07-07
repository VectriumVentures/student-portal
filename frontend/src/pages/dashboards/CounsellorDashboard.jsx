import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function CounsellorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: "John Smith", 
      email: "john@example.com", 
      status: "Applied", 
      stage: 3,
      university: "MIT",
      course: "Computer Science",
      lastContact: "2024-01-15",
      notes: "Waiting for admission decision"
    },
    { 
      id: 2, 
      name: "Sarah Wilson", 
      email: "sarah@example.com", 
      status: "Shortlisted", 
      stage: 2,
      university: "Stanford",
      course: "Data Science",
      lastContact: "2024-01-12",
      notes: "Documents submitted, preparing for interview"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike@example.com", 
      status: "Screening", 
      stage: 1,
      university: "Harvard",
      course: "Business Administration",
      lastContact: "2024-01-10",
      notes: "Initial consultation completed"
    }
  ]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newNote, setNewNote] = useState("");

  const updateStudentStage = (studentId, newStage) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, stage: newStage, status: getStatusFromStage(newStage) }
        : student
    ));
  };

  const getStatusFromStage = (stage) => {
    const statuses = ["Screening", "Shortlisted", "Applied", "Admitted"];
    return statuses[stage - 1] || "Screening";
  };

  const addNote = (studentId) => {
    if (newNote.trim()) {
      setStudents(students.map(student => 
        student.id === studentId 
          ? { ...student, notes: newNote, lastContact: new Date().toISOString().split('T')[0] }
          : student
      ));
      setNewNote("");
      setSelectedStudent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Counselor Portal 👨‍💼</h1>
              <p className="text-gray-600 text-lg">Manage your assigned students</p>
            </div>
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{students.length}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{students.filter(s => s.stage >= 3).length}</div>
                <div className="text-sm text-gray-600">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{students.filter(s => s.stage === 4).length}</div>
                <div className="text-sm text-gray-600">Admitted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-8 border border-white/20">
          <div className="flex space-x-1 p-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "students", label: "My Students", icon: "👥" },
              { id: "tasks", label: "Tasks & Follow-ups", icon: "✅" },
              { id: "communication", label: "Communication", icon: "💬" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {students.slice(0, 3).map((student) => (
                      <div key={student.id} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-800">{student.name}</h4>
                            <p className="text-sm text-gray-600">{student.university} - {student.course}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            student.status === 'Admitted' ? 'bg-green-100 text-green-800' :
                            student.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                            student.status === 'Shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {student.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                  <div className="grid gap-3">
                    <button 
                      onClick={() => setActiveTab("students")}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 text-left"
                    >
                      <div className="font-semibold">Manage Students</div>
                      <div className="text-sm opacity-90">Update application stages</div>
                    </button>
                    <button 
                      onClick={() => setActiveTab("tasks")}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-left"
                    >
                      <div className="font-semibold">Follow-up Tasks</div>
                      <div className="text-sm opacity-90">Add notes and reminders</div>
                    </button>
                    <button 
                      onClick={() => setActiveTab("communication")}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-left"
                    >
                      <div className="font-semibold">Send Messages</div>
                      <div className="text-sm opacity-90">Communicate with students</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Students</h2>
              <div className="space-y-6">
                {students.map((student) => (
                  <div key={student.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
                        <p className="text-gray-600">{student.email}</p>
                        <p className="text-sm text-gray-500">Last contact: {student.lastContact}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                          student.status === 'Admitted' ? 'bg-green-100 text-green-800' :
                          student.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                          student.status === 'Shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {student.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700"><strong>University:</strong> {student.university}</p>
                      <p className="text-gray-700"><strong>Course:</strong> {student.course}</p>
                      <p className="text-gray-700"><strong>Notes:</strong> {student.notes}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Application Progress</span>
                        <span>{student.stage}/4 stages</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(student.stage / 4) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Screening</span>
                        <span>Shortlisted</span>
                        <span>Applied</span>
                        <span>Admitted</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <select
                        value={student.stage}
                        onChange={(e) => updateStudentStage(student.id, parseInt(e.target.value))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value={1}>Screening</option>
                        <option value={2}>Shortlisted</option>
                        <option value={3}>Applied</option>
                        <option value={4}>Admitted</option>
                      </select>
                      <button 
                        onClick={() => setSelectedStudent(student.id)}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        Add Note
                      </button>
                      <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-colors">
                        Send Email
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Note Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add Follow-up Note</h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter your note..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => addNote(selectedStudent)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-semibold"
                >
                  Save Note
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
