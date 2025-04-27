import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { analyzeImage, getMedicationAdvice, findSpecialist, findHospitals } from "../../lib/api";


interface HospitalFinderProps {
    isAnalyzing: boolean;
    onFindHospitals: (location: string) => Promise<void>;
    result: {
      location: string;
      facilities: unknown[];
      count: number;
    } | null;
  }
  
  
  
  
 const HospitalFinder = ({ isAnalyzing, onFindHospitals }: HospitalFinderProps) => {
    const { language } = useLanguage();
    const [location, setLocation] = useState("");
  
    return (
      <Card className="border-purple-200 shadow-md">
        <CardHeader className="bg-purple-50">
          <CardTitle className="text-xl text-purple-800">
            {language === 'ar' ? 'البحث عن مستشفيات قريبة' : 'Find Nearby Hospitals'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل مدينتك أو عنوانك' : 'Enter your city or address'}
              className="p-2 border border-gray-300 rounded-md"
            />
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isAnalyzing}
              onClick={() => onFindHospitals(location)}
            >
              {language === 'ar' ? 'بحث' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

export default HospitalFinder;
  
  