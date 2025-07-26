import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [documents, setDocuments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    gpa: "3.8",
    major: "Computer Science",
    graduationYear: "2024"
  });

  // Mock data for demonstration
  useEffect(() => {
    setDocuments([
      { id: 1, name: "Transcript.pdf", type: "Academic", uploadDate: "2024-01-15", status: "Verified" },
      { id: 2, name: "Recommendation_Letter.pdf", type: "Reference", uploadDate: "2024-01-10", status: "Pending" },
      { id: 3, name: "Personal_Statement.docx", type: "Essay", uploadDate: "2024-01-08", status: "Verified" }
    ]);

    setApplications([
      { id: 1, university: "Stanford University", program: "MS Computer Science", status: "Under Review", deadline: "2024-03-15", progress: 75 },
      { id: 2, university: "MIT", program: "MS AI", status: "Submitted", deadline: "2024-02-28", progress: 100 },
      { id: 3, university: "UC Berkeley", program: "MS Data Science", status: "Draft", deadline: "2024-04-01", progress: 45 }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Verified": case "Submitted": return "text-green-600 bg-green-100";
      case "Under Review": case "Pending": return "text-yellow-600 bg-yellow-100";
      case "Draft": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {profile.name}! 👋</h2>
        <p className="text-blue-100">Track your university applications and manage your documents all in one place.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current GPA</p>
              <p className="text-2xl font-bold text-gray-900">{profile.gpa}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Graduation</p>
              <p className="text-2xl font-bold text-gray-900">{profile.graduationYear}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
        <div className="space-y-4">
          {applications.slice(0, 3).map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{app.university}</h4>
                <p className="text-sm text-gray-600">{app.program}</p>
                <p className="text-xs text-gray-500">Deadline: {app.deadline}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                  <div className="mt-2 w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${app.progress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ApplicationsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + New Application
        </button>
      </div>

      <div className="grid gap-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{app.university}</h3>
                <p className="text-gray-600">{app.program}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                {app.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Deadline</p>
                <p className="font-medium">{app.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${app.progress}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{app.progress}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Application ID</p>
                <p className="font-medium">APP-{app.id.toString().padStart(4, '0')}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors">
                View Details
              </button>
              <button className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200 transition-colors">
                Edit Application
              </button>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DocumentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Documents</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          + Upload Document
        </button>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.type} • Uploaded {doc.uploadDate}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                {doc.status}
              </span>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-gray-600">{profile.major} • Class of {profile.graduationYear}</p>
            <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
              Change Profile Picture
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current GPA</label>
            <input
              type="text"
              value={profile.gpa}
              onChange={(e) => setProfile({...profile, gpa: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
            <input
              type="text"
              value={profile.major}
              onChange={(e) => setProfile({...profile, major: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
            <input
              type="text"
              value={profile.graduationYear}
              onChange={(e) => setProfile({...profile, graduationYear: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />;
      case "applications": return <ApplicationsTab />;
      case "documents": return <DocumentsTab />;
      case "profile": return <ProfileTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "overview", name: "Overview", icon: "🏠" },
                  { id: "applications", name: "Applications", icon: "📝" },
                  { id: "documents", name: "Documents", icon: "📄" },
                  { id: "profile", name: "Profile", icon: "👤" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
