import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../../contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface ImageAnalysisProps {
  isAnalyzing: boolean;
  onAnalyze: (file: File) => Promise<void>;
  result: {
    content: string;
    translation: string;
  } | null;
}

export default function ImageAnalysis({ isAnalyzing, onAnalyze, result }: ImageAnalysisProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: language === 'ar' ? "تنبيه" : "Alert",
        description: language === 'ar' 
          ? "الرجاء اختيار صورة" 
          : "Please select an image",
        variant: "destructive",
      });
      return;
    }
    await onAnalyze(selectedFile);
  };

  return (
    <Card className="border-green-200 shadow-md">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-xl text-green-800">
          {language === 'ar' ? 'تحليل الصور الطبية' : 'Medical Image Analysis'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100"
        />
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={isAnalyzing || !selectedFile}
          onClick={handleUpload}
        >
          {isAnalyzing ? 
            (language === 'ar' ? "جاري التحليل..." : "Analyzing...") : 
            (language === 'ar' ? "تحليل الصورة" : "Analyze Image")}
        </Button>

        {result && (
          <div className="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
            <h3 className="font-semibold mb-2">
              {language === 'ar' ? 'نتيجة تحليل الصورة' : 'Image Analysis Result'}
            </h3>
            <div className="mb-4">
              <h4 className="font-medium mb-1">
                {language === 'ar' ? 'باللغة العربية:' : 'In Arabic:'}
              </h4>
              <p className="text-right" dir="rtl">
                {result.translation}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">
                {language === 'ar' ? 'بالإنجليزية:' : 'In English:'}
              </h4>
              <p>{result.content}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


