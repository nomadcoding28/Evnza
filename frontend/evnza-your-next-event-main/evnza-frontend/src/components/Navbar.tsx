import { Link, useLocation } from "react-router-dom";
import { Ticket, CalendarCheck } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
