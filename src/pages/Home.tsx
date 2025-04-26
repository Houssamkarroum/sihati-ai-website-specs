
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/i18n";

const Home = () => {
  const { language } = useLanguage();

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-sihati-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {getTranslation('welcomeTitle', language)}
            </h1>
            <p className="text-xl md:text-2xl text-sihati-secondary max-w-2xl mb-8">
              {getTranslation('welcomeSubtitle', language)}
            </p>
            <Link to="/chatbot">
              <Button className="text-lg px-8 py-6 bg-sihati-primary hover:bg-sihati-accent transition-colors">
                {getTranslation('startChat', language)}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{getTranslation('howHelp', language)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-sihati-light p-4 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sihati-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{getTranslation('instantHelp', language)}</h3>
              <p className="text-sihati-secondary">
                {getTranslation('instantDesc', language)}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-sihati-light p-4 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sihati-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{getTranslation('trustedInfo', language)}</h3>
              <p className="text-sihati-secondary">
                {getTranslation('trustedDesc', language)}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-sihati-light p-4 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sihati-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{getTranslation('available247', language)}</h3>
              <p className="text-sihati-secondary">
                {getTranslation('availableDesc', language)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sihati-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{getTranslation('readyToStart', language)}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {getTranslation('joinUsers', language)}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-sihati-primary hover:bg-gray-100 transition-colors">
                {getTranslation('register', language)}
              </Button>
            </Link>
            <Link to="/chatbot">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 transition-colors">
                {getTranslation('chatbot', language)}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
