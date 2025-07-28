import { useState, useEffect } from "react";

const StudentScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Mock data - replace with actual API calls
    setScholarships([
      {
        id: 1,
        name: "Merit-Based Excellence Scholarship",
        provider: "Stanford University",
        amount: "$25,000",
        deadline: "2024-03-15",
        type: "Merit-based",
        eligibility: "GPA 3.8+, STEM fields",
        description: "Full tuition scholarship for outstanding students in STEM fields",
        applied: false
      },
      {
        id: 2,
        name: "International Student Grant",
        provider: "MIT Foundation",
        amount: "$15,000",
        deadline: "2024-02-28",
        type: "Need-based",
        eligibility: "International students, Financial need",
        description: "Supporting international students with financial assistance",
        applied: true
      },
      {
        id: 3,
        name: "Women in Tech Scholarship",
        provider: "Google",
        amount: "$10,000",
        deadline: "2024-04-30",
        type: "Diversity",
        eligibility: "Women in Computer Science",
        description: "Empowering women pursuing careers in technology",
        applied: false
      },
      {
        id: 4,
        name: "Research Excellence Award",
        provider: "UC Berkeley",
        amount: "$20,000",
        deadline: "2024-05-15",
        type: "Research",
        eligibility: "Research experience, Publications",
        description: "For students with outstanding research contributions",
        applied: false
      }
    ]);
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case "Merit-based":
        return "text-blue-600 bg-blue-100";
      case "Need-based":
        return "text-green-600 bg-green-100";
      case "Diversity":
        return "text-purple-600 bg-purple-100";
      case "Research":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineColor = (daysLeft) => {
    if (daysLeft <= 7) return "text-red-600";
    if (daysLeft <= 30) return "text-yellow-600";
    return "text-green-600";
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "applied" && scholarship.applied) ||
                         (filter === "available" && !scholarship.applied) ||
                         scholarship.type.toLowerCase().replace("-", "_") === filter;
    
    return matchesSearch && matchesFilter;
  });

  const toggleApplication = (id) => {
    setScholarships(prev => prev.map(scholarship => 
      scholarship.id === id ? { ...scholarship, applied: !scholarship.applied } : scholarship
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Scholarships & Grants</h1>
        <p className="text-gray-600">Find and apply for scholarships to fund your education</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All ({scholarships.length})
            </button>
            <button
              onClick={() => setFilter("available")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "available"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Available ({scholarships.filter(s => !s.applied).length})
            </button>
            <button
              onClick={() => setFilter("applied")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "applied"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Applied ({scholarships.filter(s => s.applied).length})
            </button>
          </div>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid gap-6">
        {filteredScholarships.map((scholarship) => {
          const daysLeft = getDaysUntilDeadline(scholarship.deadline);
          
          return (
            <div key={scholarship.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{scholarship.name}</h3>
                      <p className="text-gray-600">{scholarship.provider}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(scholarship.type)}`}>
                        {scholarship.type}
                      </span>
                      {scholarship.applied && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium text-green-600 bg-green-100">
                          Applied
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Award Amount</p>
                      <p className="text-lg font-bold text-gray-900">{scholarship.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Deadline</p>
                      <p className="font-medium">{new Date(scholarship.deadline).toLocaleDateString()}</p>
                      <p className={`text-xs font-medium ${getDeadlineColor(daysLeft)}`}>
                        {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Eligibility</p>
                      <p className="text-sm text-gray-900">{scholarship.eligibility}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{scholarship.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {!scholarship.applied ? (
                      <>
                        <button 
                          onClick={() => toggleApplication(scholarship.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Apply Now
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors">
                          Save for Later
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm hover:bg-green-200 transition-colors">
                          View Application
                        </button>
                        <button 
                          onClick={() => toggleApplication(scholarship.id)}
                          className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm hover:bg-red-200 transition-colors"
                        >
                          Withdraw Application
                        </button>
                      </>
                    )}
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No scholarships found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scholarship Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{scholarships.length}</p>
            <p className="text-sm text-gray-600">Total Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{scholarships.filter(s => s.applied).length}</p>
            <p className="text-sm text-gray-600">Applied</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {scholarships.filter(s => getDaysUntilDeadline(s.deadline) <= 30 && !s.applied).length}
            </p>
            <p className="text-sm text-gray-600">Expiring Soon</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              ${scholarships.filter(s => s.applied).reduce((sum, s) => sum + parseInt(s.amount.replace(/[$,]/g, '')), 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Applied Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentScholarships;
