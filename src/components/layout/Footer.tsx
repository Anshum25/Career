import { Link } from "react-router-dom";
import { BriefcaseIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BriefcaseIcon className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">CareerAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Next-generation AI-powered job portal connecting talent with
              opportunity worldwide.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">For Job Seekers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/jobs"
                  className="hover:text-foreground transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/resume/builder"
                  className="hover:text-foreground transition-colors"
                >
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  to="/career-coach"
                  className="hover:text-foreground transition-colors"
                >
                  Career Coach
                </Link>
              </li>
              <li>
                <Link
                  to="/job-fairs"
                  className="hover:text-foreground transition-colors"
                >
                  Live Job Fairs
                </Link>
              </li>
              <li>
                <Link
                  to="/skills"
                  className="hover:text-foreground transition-colors"
                >
                  Skill Assessment
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">For Recruiters</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/post-job"
                  className="hover:text-foreground transition-colors"
                >
                  Post Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/candidates"
                  className="hover:text-foreground transition-colors"
                >
                  Find Candidates
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-tools"
                  className="hover:text-foreground transition-colors"
                >
                  AI Hiring Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/instant-interviews"
                  className="hover:text-foreground transition-colors"
                >
                  Instant Interviews
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="hover:text-foreground transition-colors"
                >
                  Hiring Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CareerAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              to="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
