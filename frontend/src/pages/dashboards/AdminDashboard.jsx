import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [systemStats, setSystemStats] = useState({});
  const [universities, setUniversities] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    setUsers([
      { id: 1, name: "John Doe", email: "john.doe@example.com", role: "student", status: "Active", joinDate: "2024-01-10", lastLogin: "2024-01-16" },
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "student", status: "Active", joinDate: "2024-01-08", lastLogin: "2024-01-15" },
      { id: 3, name: "Dr. Wilson", email: "dr.wilson@example.com", role: "counsellor", status: "Active", joinDate: "2023-12-15", lastLogin: "2024-01-16" },
      { id: 4, name: "Prof. Johnson", email: "prof.j@example.com", role: "counsellor", status: "Active", joinDate: "2023-11-20", lastLogin: "2024-01-14" },
      { id: 5, name: "Mike Brown", email: "mike.b@example.com", role: "student", status: "Inactive", joinDate: "2023-12-01", lastLogin: "2024-01-05" }
    ]);

    setSystemStats({
      totalUsers: 156,
      activeUsers: 142,
      totalApplications: 324,
      pendingApplications: 45,
      totalDocuments: 892,
      systemUptime: "99.9%",
      storageUsed: "2.3 GB",
      monthlyGrowth: "+12%"
    });

    setUniversities([
      { id: 1, name: "Stanford University", country: "USA", programs: 45, applications: 89, status: "Active" },
      { id: 2, name: "MIT", country: "USA", programs: 38, applications: 76, status: "Active" },
      { id: 3, name: "University of Oxford", country: "UK", programs: 52, applications: 67, status: "Active" },
      { id: 4, name: "University of Toronto", country: "Canada", programs: 41, applications: 54, status: "Active" },
      { id: 5, name: "Australian National University", country: "Australia", programs: 33, applications: 43, status: "Active" }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "text-green-600 bg-green-100";
      case "Inactive": return "text-red-600 bg-red-100";
      case "Pending": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "text-purple-600 bg-purple-100";
      case "counsellor": return "text-blue-600 bg-blue-100";
      case "student": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Admin! 👑</h2>
        <p className="text-purple-100">Monitor system performance, manage users, and oversee platform operations.</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers}</p>
              <p className="text-xs text-green-600">{systemStats.monthlyGrowth} this month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.activeUsers}</p>
              <p className="text-xs text-gray-500">{((systemStats.activeUsers / systemStats.totalUsers) * 100).toFixed(1)}% active rate</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.totalApplications}</p>
              <p className="text-xs text-yellow-600">{systemStats.pendingApplications} pending review</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.systemUptime}</p>
              <p className="text-xs text-gray-500">{systemStats.storageUsed} storage used</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent User Activity</h3>
          <div className="space-y-4">
            {users.slice(0, 4).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Last: {user.lastLogin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Universities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Universities</h3>
          <div className="space-y-4">
            {universities.slice(0, 4).map((uni) => (
              <div key={uni.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-medium text-gray-900">{uni.name}</h4>
                  <p className="text-sm text-gray-600">{uni.country} • {uni.programs} programs</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{uni.applications}</p>
                  <p className="text-xs text-gray-500">applications</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          + Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                      <button className="text-green-600 hover:text-green-900">Reset Password</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const UniversitiesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">University Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Add University
        </button>
      </div>

      <div className="grid gap-6">
        {universities.map((uni) => (
          <div key={uni.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{uni.name}</h3>
                <p className="text-gray-600">{uni.country}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(uni.status)}`}>
                {uni.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Programs</p>
                <p className="text-2xl font-bold text-blue-600">{uni.programs}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-green-600">{uni.applications}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Country</p>
                <p className="font-medium text-gray-900">{uni.country}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors">
                View Details
              </button>
              <button className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200 transition-colors">
                Edit University
              </button>
              <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm hover:bg-yellow-200 transition-colors">
                Manage Programs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600">Chart visualization would go here</p>
              <p className="text-sm text-gray-500">Integration with Chart.js or similar</p>
            </div>
          </div>
        </div>

        {/* Application Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Total Applications</span>
              <span className="text-2xl font-bold text-blue-600">{systemStats.totalApplications}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium">Pending Review</span>
              <span className="text-2xl font-bold text-yellow-600">{systemStats.pendingApplications}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Approved</span>
              <span className="text-2xl font-bold text-green-600">{systemStats.totalApplications - systemStats.pendingApplications}</span>
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Uptime</span>
              <span className="font-bold text-green-600">{systemStats.systemUptime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Storage Used</span>
              <span className="font-bold">{systemStats.storageUsed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Sessions</span>
              <span className="font-bold text-blue-600">{systemStats.activeUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Growth</span>
              <span className="font-bold text-green-600">{systemStats.monthlyGrowth}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">New user registration: John Doe</span>
              <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Application submitted to MIT</span>
              <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Document uploaded by Jane Smith</span>
              <span className="text-xs text-gray-500 ml-auto">10 min ago</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Meeting scheduled with counselor</span>
              <span className="text-xs text-gray-500 ml-auto">15 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />;
      case "users": return <UsersTab />;
      case "universities": return <UniversitiesTab />;
      case "analytics": return <AnalyticsTab />;
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
                  { id: "users", name: "Users", icon: "👥" },
                  { id: "universities", name: "Universities", icon: "🏛️" },
                  { id: "analytics", name: "Analytics", icon: "📊" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-purple-500 text-purple-600"
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
}
