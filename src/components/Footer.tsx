
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-6 shadow-inner mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sihati-secondary text-sm">
            © 2025 صحتي AI. جميع الحقوق محفوظة.
          </p>
          <div className="flex justify-center mt-3 space-x-4 space-x-reverse">
            <Link to="/" className="text-sihati-secondary hover:text-sihati-primary transition-colors text-sm">
              الرئيسية
            </Link>
            <Link to="/chatbot" className="text-sihati-secondary hover:text-sihati-primary transition-colors text-sm">
              المحادثة
            </Link>
            <Link to="/login" className="text-sihati-secondary hover:text-sihati-primary transition-colors text-sm">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
