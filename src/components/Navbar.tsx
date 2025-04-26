
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-sihati-primary">
            صحتي AI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {isAuthenticated ? (
              <>
                <Link to="/" className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors">
                  الرئيسية
                </Link>
                <Link to="/chatbot" className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors">
                  المحادثة
                </Link>
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={handleLogout}
                >
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">تسجيل الدخول</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-sihati-primary hover:bg-sihati-accent transition-colors">إنشاء حساب</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="outline" size="icon" onClick={toggleMenu}>
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 slide-in">
            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/" 
                    className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    الرئيسية
                  </Link>
                  <Link 
                    to="/chatbot" 
                    className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    المحادثة
                  </Link>
                  <Button 
                    variant="outline" 
                    className="mx-3"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="ml-2 h-4 w-4" />
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">تسجيل الدخول</Button>
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-sihati-primary hover:bg-sihati-accent transition-colors">إنشاء حساب</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
