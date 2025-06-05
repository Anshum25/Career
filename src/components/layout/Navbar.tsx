import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeProvider";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BriefcaseIcon,
  SearchIcon,
  FileTextIcon,
  BookmarkIcon,
  BarChart3Icon,
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const coreNavItems = [
    {
      name: "Find Jobs",
      path: "/jobs",
      icon: <SearchIcon className="h-4 w-4" />,
    },
    {
      name: "My Applications",
      path: "/applications",
      icon: <BriefcaseIcon className="h-4 w-4" />,
    },
    {
      name: "Saved Jobs",
      path: "/saved-jobs",
      icon: <BookmarkIcon className="h-4 w-4" />,
    },
    {
      name: "Tools",
      path: "/features",
      icon: <BarChart3Icon className="h-4 w-4" />,
    },
    {
      name: "My Resume",
      path: "/ai/resume-scorer",
      icon: <FileTextIcon className="h-4 w-4" />,
    },
  ];

  const NavLink = ({
    item,
    mobile = false,
  }: {
    item: any;
    mobile?: boolean;
  }) => {
    const isActive = location.pathname === item.path;
    const baseClasses = mobile
      ? "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
      : "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";

    const activeClasses = isActive
      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50";

    return (
      <Link
        to={item.path}
        className={`${baseClasses} ${activeClasses}`}
        onClick={() => mobile && setIsMobileMenuOpen(false)}
      >
        {item.icon}
        {item.name}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/20 dark:border-slate-700/20 shadow-lg"
            : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Link to="/" className="flex items-center gap-2">
                <BriefcaseIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  CareerAI
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Core Functions */}
            {isAuthenticated && (
              <div className="hidden lg:flex items-center gap-2">
                {coreNavItems.map((item) => (
                  <NavLink key={item.path} item={item} />
                ))}
              </div>
            )}

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <NotificationCenter />

                  {/* Theme Toggle */}
                  <ThemeToggle />

                  {/* Profile Dropdown - Simplified */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-blue-500/20 transition-all duration-200"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/20 dark:border-slate-700/20"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-2">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {user.email}
                          </p>
                          <Badge variant="secondary" className="w-fit text-xs">
                            {user.role === "job_seeker"
                              ? "Job Seeker"
                              : "Recruiter"}
                          </Badge>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {/* Profile and Settings */}
                      <DropdownMenuItem asChild>
                        <Link
                          to="/profile/naukri"
                          className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
                        >
                          <UserIcon className="h-4 w-4" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          to="/profile/naukri"
                          className="flex items-center gap-2 text-slate-700 dark:text-slate-300"
                        >
                          <SettingsIcon className="h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                      >
                        <LogOutIcon className="h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? (
                      <XIcon className="h-5 w-5" />
                    ) : (
                      <MenuIcon className="h-5 w-5" />
                    )}
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Link to="/register">Get Started</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-2">
                {coreNavItems.map((item) => (
                  <NavLink key={item.path} item={item} mobile />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16" />
    </>
  );
}
