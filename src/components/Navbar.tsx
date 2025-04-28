import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, LayoutDashboard, Contact } from "lucide-react";
import { toast } from "sonner";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/i18n";

const Navbar = () => {
  const [inoVisible, setInoVisible] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userType = localStorage.getItem("userType");
  const isDoctor = userType === "doctor";

  useEffect(() => {
    const interval = setInterval(() => {
      setInoVisible(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userType");
    toast.success(language === 'ar' ? "تم تسجيل الخروج بنجاح" : "ⴱⵔⴰ");
    navigate("/login");
  };

  return (
    <nav className="bg-sihati-primary shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-green-500">SAHT</span>
            <span className={`transition-opacity duration-500 ${inoVisible ? 'opacity-100' : 'opacity-0'} text-white`}>
              -INO
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <>
                <Link to="/" className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors">
                  {getTranslation('home', language)}
                </Link>
                <Link to="/chatbot" className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors">
                  {getTranslation('chatbot', language)}
                </Link>
                <Link to="/analyze" className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors">
                  {getTranslation('analyze', language)}
                </Link>
                <Link to="/contact" className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors flex items-center">
                  <Contact className="ml-2 h-4 w-4" />
                  {getTranslation('contact', language)}
                </Link>
                {isDoctor && (
                  <Link to="/doctor-dashboard" className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors flex items-center">
                    <LayoutDashboard className="ml-2 h-4 w-4" />
                    {getTranslation('dashboard', language)}
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={handleLogout}
                >
                  <LogOut className="ml-2 h-4 w-4" />
                  {getTranslation('logout', language)}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">
                    {getTranslation('login', language)}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-sihati-primary hover:bg-sihati-accent transition-colors">
                    {getTranslation('register', language)}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                    {getTranslation('home', language)}
                  </Link>
                  <Link 
                    to="/chatbot" 
                    className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getTranslation('chatbot', language)}
                  </Link>
                  <Link 
                    to="/analyze" 
                    className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getTranslation('analyze', language)}
                  </Link>
                  <Link 
                    to="/contact" 
                    className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Contact className="ml-2 h-4 w-4" />
                    {getTranslation('contact', language)}
                  </Link>
                  {isDoctor && (
                    <Link 
                      to="/doctor-dashboard" 
                      className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="ml-2 h-4 w-4" />
                      {getTranslation('dashboard', language)}
                    </Link>
                  )}
                  <Button 
                    variant="outline" 
                    className="mx-3"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="ml-2 h-4 w-4" />
                    {getTranslation('logout', language)}
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">{getTranslation('login', language)}</Button>
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-sihati-primary hover:bg-sihati-accent transition-colors">
                      {getTranslation('register', language)}
                    </Button>
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
