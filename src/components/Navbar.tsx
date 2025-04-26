
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link to="/" className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors">
              الرئيسية
            </Link>
            <Link to="/chatbot" className="px-3 py-2 text-sihati-secondary hover:text-sihati-primary transition-colors">
              المحادثة
            </Link>
            <Link to="/login">
              <Button variant="outline" className="mr-2">تسجيل الدخول</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-sihati-primary hover:bg-sihati-accent transition-colors">إنشاء حساب</Button>
            </Link>
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
