import { useState, useEffect } from "react";
import { STATUS_TYPES } from "../../../constants";

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");

  useEffect(() => {
    // Mock data - replace with actual API calls
    setApplications([
      {
        id: 1,
        university: "Stanford University",
        program: "MS Computer Science",
        status: STATUS_TYPES.UNDER_REVIEW,
        deadline: "2024-03-15",
        progress: 75,
        submittedDate: "2024-01-15",
        requirements: {
          transcript: "completed",
          sop: "completed",
          lor: "pending",
          resume: "completed"
        }
      },
      {
        id: 2,
        university: "MIT",
        program: "MS Artificial Intelligence",
        status: STATUS_TYPES.SUBMITTED,
        deadline: "2024-02-28",
        progress: 100,
        submittedDate: "2024-01-20",
        requirements: {
          transcript: "completed",
          sop: "completed",
          lor: "completed",
          resume: "completed"
        }
      },
      {
        id: 3,
        university: "UC Berkeley",
        program: "MS Data Science",
        status: STATUS_TYPES.DRAFT,
        deadline: "2024-04-01",
        progress: 45,
        submittedDate: null,
        requirements: {
          transcript: "completed",
          sop: "pending",
          lor: "pending",
          resume: "completed"
        }
      },
      {
        id: 4,
        university: "Carnegie Mellon",
        program: "MS Software Engineering",
        status: STATUS_TYPES.COMPLETED,
        deadline: "2024-01-15",
        progress: 100,
        submittedDate: "2023-12-10",
        requirements: {
          transcript: "completed",
          sop: "completed",
          lor: "completed",
          resume: "completed"
        }
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case STATUS_TYPES.COMPLETED:
        return "text-green-600 bg-green-100";
      case STATUS_TYPES.SUBMITTED:
        return "text-blue-600 bg-blue-100";
      case STATUS_TYPES.UNDER_REVIEW:
        return "text-yellow-600 bg-yellow-100";
      case STATUS_TYPES.DRAFT:
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRequirementStatus = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === "all") return true;
    return app.status.toLowerCase().replace(/\s+/g, "_") === filter;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case "deadline":
        return new Date(a.deadline) - new Date(b.deadline);
      case "university":
        return a.university.localeCompare(b.university);
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600">Track and manage your university applications</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + New Application
        </button>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All ({applications.length})
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "draft"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Draft ({applications.filter(app => app.status === STATUS_TYPES.DRAFT).length})
            </button>
            <button
              onClick={() => setFilter("submitted")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "submitted"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Submitted ({applications.filter(app => app.status === STATUS_TYPES.SUBMITTED).length})
            </button>
            <button
              onClick={() => setFilter("under_review")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "under_review"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Under Review ({applications.filter(app => app.status === STATUS_TYPES.UNDER_REVIEW).length})
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="deadline">Deadline</option>
              <option value="university">University</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid gap-6">
        {sortedApplications.map((app) => (
          <div key={app.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{app.university}</h3>
                    <p className="text-gray-600">{app.program}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-medium">{new Date(app.deadline).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{app.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Application ID</p>
                    <p className="font-medium">APP-{app.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements Status */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements Status</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRequirementStatus(app.requirements.transcript)}`}>
                    Transcript
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRequirementStatus(app.requirements.sop)}`}>
                    SOP
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRequirementStatus(app.requirements.lor)}`}>
                    LOR
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRequirementStatus(app.requirements.resume)}`}>
                    Resume
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors">
                View Details
              </button>
              {app.status === STATUS_TYPES.DRAFT && (
                <button className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200 transition-colors">
                  Continue Application
                </button>
              )}
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors">
                Download PDF
              </button>
              {app.status !== STATUS_TYPES.SUBMITTED && app.status !== STATUS_TYPES.COMPLETED && (
                <button className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors">
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {sortedApplications.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first application.</p>
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              + New Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApplications;
