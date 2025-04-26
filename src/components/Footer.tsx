
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/i18n";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-green-50 py-6 shadow-inner mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-green-700 text-sm">
            {getTranslation('copyright', language)}
          </p>
          <div className="flex justify-center mt-3 space-x-4 space-x-reverse">
            <Link to="/" className="text-green-600 hover:text-sihati-primary transition-colors text-sm">
              {getTranslation('home', language)}
            </Link>
            <Link to="/chatbot" className="text-green-600 hover:text-sihati-primary transition-colors text-sm">
              {getTranslation('chatbot', language)}
            </Link>
            <Link to="/login" className="text-green-600 hover:text-sihati-primary transition-colors text-sm">
              {getTranslation('login', language)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
