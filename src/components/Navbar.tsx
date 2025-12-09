import { Link, useNavigate } from "react-router-dom";
import { Clock, LogOut, ArrowLeft, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface NavbarProps {
  showBack?: boolean;
  showLogout?: boolean;
  backTo?: string;
}

const Navbar = ({ showBack = false, showLogout = true, backTo = "/app" }: NavbarProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {showBack && (
              <Link to={backTo}>
                <Button variant="ghost" size="icon" className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-hero rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-hero p-2 rounded-xl">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <span className="font-display text-xl font-bold text-foreground hidden sm:block">
                TimeTrack
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-muted-foreground hidden md:block">
                {user.email}
              </span>
            )}
            {location.pathname === "/app" && (
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </Button>
              </Link>
            )}
            {showLogout && user && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
