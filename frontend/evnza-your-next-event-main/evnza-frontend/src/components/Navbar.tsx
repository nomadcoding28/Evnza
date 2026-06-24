import { Link, useLocation, useNavigate } from "react-router-dom";
import { Ticket, CalendarCheck, LogIn, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  // Sync auth state whenever route changes
  useEffect(() => {
    const email = localStorage.getItem("evnza_email");
    const token = localStorage.getItem("evnza_token");
    setUserEmail(email && token ? email : null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("evnza_token");
    localStorage.removeItem("evnza_email");
    setUserEmail(null);
    toast({ title: "Logged out", description: "See you next time! 👋" });
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Ticket className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-2xl font-bold gradient-text">Evnza</span>
          </Link>

          {/* Navigation Links + Auth */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`nav-link flex items-center gap-2 py-2 ${
                isActive("/") ? "nav-link-active" : ""
              }`}
            >
              <span>Home</span>
            </Link>
            <Link
              to="/my-bookings"
              className={`nav-link flex items-center gap-2 py-2 ${
                isActive("/my-bookings") ? "nav-link-active" : ""
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>My Bookings</span>
            </Link>

            {/* Auth section */}
            {userEmail ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground max-w-[140px] truncate">
                    {userEmail}
                  </span>
                </div>
                <Button
                  id="navbar-logout-btn"
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="text-xs">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  id="navbar-login-btn"
                  size="sm"
                  className="btn-neon flex items-center gap-2 py-2 px-4 text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
