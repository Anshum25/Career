import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
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
import ProfileSetup from "@/pages/profile/ProfileSetup";
import ResumeBuilder from "@/pages/profile/ResumeBuilder";
import ApplicationTracker from "@/pages/applications/ApplicationTracker";
import NotFound from "@/pages/NotFound";

import "./App.css";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
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
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/applications" element={<ApplicationTracker />} />
                <Route path="/profile/setup" element={<ProfileSetup />} />
                <Route path="/resume/builder" element={<ResumeBuilder />} />
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
