import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StudentOverview from "./student/StudentOverview";
import StudentApplications from "./student/StudentApplications";
import StudentDocuments from "./student/StudentDocuments";
import StudentUniversities from "./student/StudentUniversities";
import StudentScholarships from "./student/StudentScholarships";
import StudentProfile from "./student/StudentProfile";

const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<StudentOverview />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="documents" element={<StudentDocuments />} />
        <Route path="universities" element={<StudentUniversities />} />
        <Route path="scholarships" element={<StudentScholarships />} />
        <Route path="profile" element={<StudentProfile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentDashboard;
