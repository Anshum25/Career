import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";

// Layout Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Pages
import HomePage from "@/pages/HomePage";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import JobSeekerDashboard from "@/pages/dashboard/JobSeekerDashboard";
import RecruiterDashboard from "@/pages/dashboard/RecruiterDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import JobSearch from "@/pages/jobs/JobSearch";
import JobDetails from "@/pages/jobs/JobDetails";
import JobPost from "@/pages/jobs/JobPost";
import ProfileSetup from "@/pages/profile/ProfileSetup";
import ResumeBuilder from "@/pages/profile/ResumeBuilder";
import ApplicationTracker from "@/pages/applications/ApplicationTracker";
import MessageCenter from "@/components/messaging/MessageCenter";
import ResumeAnalyzer from "@/pages/tools/ResumeAnalyzer";
import SavedJobs from "@/components/jobs/SavedJobs";
import NotificationPage from "@/components/notifications/NotificationCenter";
import InterviewPrepBot from "@/components/interview/InterviewPrepBot";
import CareerPathVisualizer from "@/components/career/CareerPathVisualizer";
import JobTinder from "@/components/matching/JobTinder";
import AdminDashboard from "@/components/admin/AdminDashboard";
import NaukriStyleAuth from "@/components/auth/NaukriStyleAuth";
import NaukriStyleProfile from "@/components/profile/NaukriStyleProfile";
import JobAlerts from "@/components/features/JobAlerts";
import CompanyProfiles from "@/components/features/CompanyProfiles";
import NotFound from "@/pages/NotFound";

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard/seeker"
                  element={<JobSeekerDashboard />}
                />
                <Route
                  path="/dashboard/recruiter"
                  element={<RecruiterDashboard />}
                />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/jobs" element={<JobSearch />} />
                <Route path="/jobs/post" element={<JobPost />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/applications" element={<ApplicationTracker />} />
                <Route path="/messages" element={<MessageCenter />} />
                <Route path="/profile/setup" element={<ProfileSetup />} />
                <Route
                  path="/profile/naukri"
                  element={<NaukriStyleProfile />}
                />
                <Route path="/resume/builder" element={<ResumeBuilder />} />
                <Route path="/resume/analyzer" element={<ResumeAnalyzer />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="/interview-prep" element={<InterviewPrepBot />} />
                <Route path="/career-path" element={<CareerPathVisualizer />} />
                <Route path="/find-my-match" element={<JobTinder />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/auth/naukri" element={<NaukriStyleAuth />} />
                <Route path="/job-alerts" element={<JobAlerts />} />
                <Route path="/companies" element={<CompanyProfiles />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
