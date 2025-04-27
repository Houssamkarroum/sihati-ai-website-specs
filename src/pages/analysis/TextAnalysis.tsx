// File: src/pages/analysis/ImageAnalysis.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { analyzeImage, getMedicationAdvice, findSpecialist, findHospitals } from "../../lib/api";

interface TextAnalysisProps {
  isAnalyzing: boolean;
  onAnalyze: (description: string) => Promise<void>;
}

export default function TextAnalysis({ isAnalyzing, onAnalyze }: TextAnalysisProps) {
  const { language } = useLanguage();
  const [description, setDescription] = useState("");

  return (
    <Card className="border-green-200 shadow-md">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-xl text-green-800">
          {language === 'ar' ? 'تحليل النص الطبي' : 'Medical Text Analysis'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <Textarea
          placeholder={
            language === 'ar' ? 'صف حالتك الصحية أو الأعراض...' : 
            'Describe your health condition or symptoms...'
          }
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[150px] border-green-200 focus:border-green-400"
        />
        <div className="flex justify-end">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isAnalyzing}
            onClick={() => onAnalyze(description)}
          >
            {isAnalyzing ? 
              (language === 'ar' ? "جاري التحليل..." : "Analyzing...") : 
              (language === 'ar' ? "تحليل النص" : "Analyze Text")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}



