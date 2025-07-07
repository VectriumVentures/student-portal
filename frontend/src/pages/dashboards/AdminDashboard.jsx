import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([
    { id: 1, name: "John Smith", email: "john@example.com", role: "student", status: "active", joinDate: "2024-01-15" },
    { id: 2, name: "Sarah Wilson", email: "sarah@example.com", role: "student", status: "active", joinDate: "2024-01-12" },
    { id: 3, name: "Dr. Mike Johnson", email: "mike@example.com", role: "counsellor", status: "active", joinDate: "2024-01-10" },
    { id: 4, name: "Admin User", email: "admin@crm.com", role: "admin", status: "active", joinDate: "2024-01-01" }
  ]);
  const [universities, setUniversities] = useState([
    { id: 1, name: "MIT", country: "USA", courses: ["Computer Science", "Engineering"], ranking: 1 },
    { id: 2, name: "Stanford", country: "USA", courses: ["Data Science", "AI/ML"], ranking: 2 },
    { id: 3, name: "Harvard", country: "USA", courses: ["Business", "Medicine"], ranking: 3 }
  ]);
  const [countries, setCountries] = useState([
    { id: 1, name: "United States", code: "USA", universities: 3 },
    { id: 2, name: "United Kingdom", code: "UK", universities: 2 },
    { id: 3, name: "Canada", code: "CA", universities: 1 }
  ]);

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const getStats = () => {
    const totalUsers = users.length;
    const students = users.filter(u => u.role === 'student').length;
    const counsellors = users.filter(u => u.role === 'counsellor').length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    
    return { totalUsers, students, counsellors, activeUsers };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Portal 👑</h1>
              <p className="text-gray-600 text-lg">Manage your CRM platform</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalUsers}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.students}</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{stats.counsellors}</div>
                <div className="text-sm text-gray-600">Counselors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-8 border border-white/20">
          <div className="flex space-x-1 p-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "users", label: "User Management", icon: "👥" },
              { id: "universities", label: "Universities", icon: "🏫" },
              { id: "countries", label: "Countries", icon: "🌍" },
              { id: "reports", label: "Reports", icon: "📈" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">System Overview</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Applications</p>
                      <p className="text-3xl font-bold">89</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📝</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">Success Rate</p>
                      <p className="text-3xl font-bold">78%</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">✅</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Pending Reviews</p>
                      <p className="text-3xl font-bold">12</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⏳</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Revenue</p>
                      <p className="text-3xl font-bold">$45K</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="font-semibold text-gray-800">New student registered</p>
                      <p className="text-sm text-gray-600">John Doe joined the platform</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="font-semibold text-gray-800">Application submitted</p>
                      <p className="text-sm text-gray-600">Sarah Wilson applied to MIT</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="font-semibold text-gray-800">Counselor assigned</p>
                      <p className="text-sm text-gray-600">Dr. Johnson assigned to new student</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                  <div className="grid gap-3">
                    <button 
                      onClick={() => setActiveTab("users")}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-left"
                    >
                      <div className="font-semibold">Manage Users</div>
                      <div className="text-sm opacity-90">Add, edit, or remove users</div>
                    </button>
                    <button 
                      onClick={() => setActiveTab("universities")}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 text-left"
                    >
                      <div className="font-semibold">Manage Universities</div>
                      <div className="text-sm opacity-90">Update university database</div>
                    </button>
                    <button 
                      onClick={() => setActiveTab("reports")}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-left"
                    >
                      <div className="font-semibold">Generate Reports</div>
                      <div className="text-sm opacity-90">View analytics and insights</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold">
                  Add New User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Role</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Join Date</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">{user.name}</td>
                        <td className="py-4 px-4">{user.email}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'counsellor' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">{user.joinDate}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => toggleUserStatus(user.id)}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                            >
                              {user.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button 
                              onClick={() => deleteUser(user.id)}
                              className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Universities Tab */}
          {activeTab === "universities" && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">University Management</h2>
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 font-semibold">
                  Add University
                </button>
              </div>
              <div className="grid gap-6">
                {universities.map((university) => (
                  <div key={university.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{university.name}</h3>
                        <p className="text-gray-600">Country: {university.country}</p>
                        <p className="text-gray-600">Ranking: #{university.ranking}</p>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Available Courses:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {university.courses.map((course, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                          Edit
                        </button>
                        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Countries Tab */}
          {activeTab === "countries" && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Country Management</h2>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-semibold">
                  Add Country
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {countries.map((country) => (
                  <div key={country.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{country.name}</h3>
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {country.code}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{country.universities} Universities</p>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports & Analytics</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Application Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Applications:</span>
                      <span className="font-bold">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved:</span>
                      <span className="font-bold">67</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending:</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rejected:</span>
                      <span className="font-bold">10</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Processing Time:</span>
                      <span className="font-bold">14 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Student Satisfaction:</span>
                      <span className="font-bold">4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue This Month:</span>
                      <span className="font-bold">$45,230</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <button className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Application Report</h3>
                  <p className="text-gray-600 text-sm">Generate detailed application analytics</p>
                </button>

                <button className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">User Activity Report</h3>
                  <p className="text-gray-600 text-sm">Track user engagement and activity</p>
                </button>

                <button className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Financial Report</h3>
                  <p className="text-gray-600 text-sm">Revenue and financial analytics</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
