
import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/i18n";
import { MessageSquare, Bot } from "lucide-react";
import { Link } from "react-router-dom";

const ActionButtons = () => {
  const { language } = useLanguage();

  return (
    <div className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-8">
          {language === 'ar' ? 'ابدأ رحلتك الصحية معنا' : 
           language === 'ber' ? 'ⴱⴷⵓ ⵜⴰⵎⵓⵏⵜ ⵏⵏⴽ ⵏ ⵜⵣⵡⵉⵜ ⴰⴽⴷⵏⵖ' :
           language === 'dar' ? 'بدا الرحلة الصحية ديالك معنا' :
           'ⴱⴷⵓ ⵜⴰⵎⵓⵏⵜ ⵏⵏⴽ ⵏ ⵜⴷⵓⵙⵉ ⴰⴽⴷⵏⵖ'}
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link to="/analyze" className="w-full md:w-auto">
            <Button className="w-full md:w-auto text-lg px-8 py-6 bg-sihati-primary hover:bg-sihati-accent text-white shadow-lg border-b-4 border-green-700 hover:translate-y-1 hover:border-b-2 transition-all duration-200">
              <Bot className="mr-2 h-5 w-5" />
              {language === 'ar' ? 'تحليل الحالة' : 
               language === 'ber' ? 'ⴰⵙⵍⴽⴷ ⵏ ⵡⴰⴷⴷⴰⴷ' :
               language === 'dar' ? 'تحليل الحالة' :
               'ⴰⵙⵍⴽⴷ ⵏ ⵡⴰⴷⴷⴰⴷ'}
            </Button>
          </Link>

          <Link to="/chatbot" className="w-full md:w-auto">
            <Button className="w-full md:w-auto text-lg px-8 py-6 bg-white border-2 border-sihati-primary text-sihati-primary hover:bg-sihati-light shadow-lg hover:text-sihati-accent transition-all duration-200">
              <MessageSquare className="mr-2 h-5 w-5" />
              {language === 'ar' ? 'التحدث مع المساعد' : 
               language === 'ber' ? 'ⵙⴰⵡⵍ ⴷ ⵓⵎⵙⵜⴰⵡⴰⵔ' :
               language === 'dar' ? 'دردش مع المساعد' :
               'ⵙⴰⵡⵍ ⴷ ⵓⵎⵙⵜⴰⵡⵔ'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
