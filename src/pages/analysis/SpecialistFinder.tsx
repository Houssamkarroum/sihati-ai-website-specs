import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { analyzeImage, getMedicationAdvice, findSpecialist, findHospitals } from "../../lib/api";


interface SpecialistFinderProps {
    isAnalyzing: boolean;
    onFindSpecialist: (illness: string) => Promise<void>;
    result: {
      content: string;
      translation: string;
    } | null;
  }
  
  
  

const SpecialistFinder = ({ isAnalyzing, onFindSpecialist }: SpecialistFinderProps) => {
  const { language } = useLanguage();
  const [illness, setIllness] = useState("");

  return (
    <Card className="border-blue-200 shadow-md">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-xl text-blue-800">
          {language === 'ar' ? 'البحث عن أخصائي' : 'Find Specialist'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <Textarea
          placeholder={
            language === 'ar' ? 'أدخل حالتك المرضية...' : 
            'Enter your medical condition...'
          }
          value={illness}
          onChange={(e) => setIllness(e.target.value)}
          className="min-h-[100px] border-blue-200 focus:border-blue-400"
        />
        <div className="flex justify-end">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isAnalyzing}
            onClick={() => onFindSpecialist(illness)}
          >
            {isAnalyzing ? 
              (language === 'ar' ? "جاري البحث..." : "Searching...") : 
              (language === 'ar' ? "البحث عن أخصائي" : "Find Specialist")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialistFinder;

