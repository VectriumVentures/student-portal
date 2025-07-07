import Navbar from "../../components/Navbar";
import { useState } from "react";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country"
  });
  const [preferences, setPreferences] = useState({
    country: "USA",
    course: "Computer Science",
    budget: "50000",
    intake: "Fall 2024"
  });
  const [documents, setDocuments] = useState([
    { id: 1, name: "Academic Transcript", status: "uploaded", date: "2024-01-15" },
    { id: 2, name: "ID Proof", status: "pending", date: null },
    { id: 3, name: "English Proficiency", status: "uploaded", date: "2024-01-10" }
  ]);
  const [applications, setApplications] = useState([
    { id: 1, university: "MIT", course: "Computer Science", status: "Applied", stage: 3 },
    { id: 2, university: "Stanford", course: "AI/ML", status: "Shortlisted", stage: 2 },
    { id: 3, university: "Harvard", course: "Data Science", status: "Screening", stage: 1 }
  ]);

  const getStageProgress = (stage) => {
    const stages = ["Screening", "Shortlisted", "Applied", "Admitted"];
    return (stage / stages.length) * 100;
  };

  const handleFileUpload = (docId) => {
    setDocuments(docs => docs.map(doc =>
      doc.id === docId
        ? { ...doc, status: "uploaded", date: new Date().toISOString().split('T')[0] }
        : doc
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Portal 🎓</h1>
              <p className="text-gray-600 text-lg">Manage your university applications</p>
            </div>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
                <div className="text-sm text-gray-600">Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{documents.filter(d => d.status === 'uploaded').length}</div>
                <div className="text-sm text-gray-600">Documents</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-8 border border-white/20">
          <div className="flex space-x-1 p-2">
            {[
              { id: "overview", label: "Overview", icon: "📊" },
              { id: "profile", label: "Profile", icon: "👤" },
              { id: "documents", label: "Documents", icon: "📄" },
              { id: "preferences", label: "Preferences", icon: "⚙️" },
              { id: "applications", label: "Applications", icon: "🎯" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
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
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Application Progress</h3>
                  {applications.map((app) => (
                    <div key={app.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-800">{app.university}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          app.status === 'Admitted' ? 'bg-green-100 text-green-800' :
                          app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'Shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{app.course}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getStageProgress(app.stage)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Quick Actions</h3>
                  <div className="grid gap-3">
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-left">
                      <div className="font-semibold">Upload Documents</div>
                      <div className="text-sm opacity-90">Complete your application</div>
                    </button>
                    <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 text-left">
                      <div className="font-semibold">Update Preferences</div>
                      <div className="text-sm opacity-90">Modify your course preferences</div>
                    </button>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-left">
                      <div className="font-semibold">Contact Counselor</div>
                      <div className="text-sm opacity-90">Get guidance and support</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Management</h2>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        doc.status === 'uploaded' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        <svg className={`w-6 h-6 ${
                          doc.status === 'uploaded' ? 'text-green-600' : 'text-yellow-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                        <p className="text-sm text-gray-600">
                          {doc.status === 'uploaded' ? `Uploaded on ${doc.date}` : 'Pending upload'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      {doc.status === 'pending' ? (
                        <button
                          onClick={() => handleFileUpload(doc.id)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
                        >
                          Upload
                        </button>
                      ) : (
                        <>
                          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            View
                          </button>
                          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                            Replace
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200">
                  Choose Files
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Study Preferences</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Country</label>
                    <select
                      value={preferences.country}
                      onChange={(e) => setPreferences({...preferences, country: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course/Field</label>
                    <select
                      value={preferences.course}
                      onChange={(e) => setPreferences({...preferences, course: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Business Administration">Business Administration</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Arts & Humanities">Arts & Humanities</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget (USD)</label>
                    <select
                      value={preferences.budget}
                      onChange={(e) => setPreferences({...preferences, budget: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="25000">$25,000 - $50,000</option>
                      <option value="50000">$50,000 - $75,000</option>
                      <option value="75000">$75,000 - $100,000</option>
                      <option value="100000">$100,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Intake Period</label>
                    <select
                      value={preferences.intake}
                      onChange={(e) => setPreferences({...preferences, intake: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Fall 2024">Fall 2024</option>
                      <option value="Spring 2025">Spring 2025</option>
                      <option value="Fall 2025">Fall 2025</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-semibold">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h2>
              <div className="space-y-6">
                {applications.map((app) => (
                  <div key={app.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{app.university}</h3>
                        <p className="text-gray-600">{app.course}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        app.status === 'Admitted' ? 'bg-green-100 text-green-800' :
                        app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'Shortlisted' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Application Progress</span>
                        <span>{app.stage}/4 stages</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${getStageProgress(app.stage)}%` }}
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
                      <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                        View Details
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        Contact Counselor
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-semibold">
                  Find More Universities
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
