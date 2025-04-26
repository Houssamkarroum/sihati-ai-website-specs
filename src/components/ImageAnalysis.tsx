
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ImageAnalysis = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setAnalysis(
        language === 'ar' ? 'بناءً على الصورة المقدمة، يبدو أن الحالة طبيعية. ننصح بمراقبة الوضع والاستشارة الطبية إذا ظهرت أعراض جديدة.' :
        language === 'ber' ? 'ⵙ ⵓⵙⵔⵓⵎⵙ ⵅⴼ ⵜⵡⵍⴰⴼⵜ ⵉⵜⵜⵓⵙⴽⴰⵏ, ⵉⴱⴰⵏ ⴰⴷⴷⴰⴷ ⵉⵖⵓⴷⴰⵏ.' :
        language === 'dar' ? 'على حساب الصورة لي قدمتي، يبان أن الحالة عادية. كننصحو بالمراقبة والاستشارة الطبية إلى ظهرو أعراض جديدة.' :
        'ⵙ ⵓⵙⵔⵓⵎⵙ ⵅⴼ ⵜⵡⵍⴰⴼⵜ ⵉⵜⵜⵓⵙⴽⴰⵏ, ⵉⴱⴰⵏ ⴰⴷⴷⴰⴷ ⵉⵖⵓⴷⴰⵏ.'
      );
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="mb-8 border-green-200 shadow-md">
      <CardHeader className="bg-sihati-light">
        <CardTitle className="text-xl text-green-800">
          {language === 'ar' ? 'تحليل الصورة' :
           language === 'ber' ? 'ⴰⵙⵍⴽⴷ ⵏ ⵜⵡⵍⴰⴼⵜ' :
           language === 'dar' ? 'تحليل الصورة' :
           'ⴰⵙⵍⴽⴷ ⵏ ⵜⵡⵍⴰⴼⵜ'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <label className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="w-full h-40 border-2 border-dashed border-green-200 rounded-lg flex items-center justify-center bg-green-50 hover:bg-green-100 transition-colors">
                {selectedImage ? (
                  <img src={selectedImage} alt="Uploaded" className="max-h-36 object-contain" />
                ) : (
                  <div className="text-center">
                    <Image className="mx-auto h-12 w-12 text-green-400" />
                    <p className="mt-2 text-sm text-green-600">
                      {language === 'ar' ? 'انقر لتحميل صورة' :
                       language === 'ber' ? 'ⴽⵍⵉⴽ ⴰⴼⴰⴷ ⴰⴷ ⵜⵙⵙⵉⴷⴼⴷ ⵜⴰⵡⵍⴰⴼⵜ' :
                       language === 'dar' ? 'كليكي باش تحمل صورة' :
                       'ⴽⵍⵉⴽ ⴰⴼⴰⴷ ⴰⴷ ⵜⵙⵙⵉⴷⴼⴷ ⵜⴰⵡⵍⴰⴼⵜ'}
                    </p>
                  </div>
                )}
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
          
          {selectedImage && (
            <Button 
              className="w-full bg-sihati-primary hover:bg-sihati-accent text-white"
              onClick={analyzeImage}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 
                (language === 'ar' ? 'جاري التحليل...' :
                 language === 'ber' ? 'ⴰⵙⵍⴽⴷ ⵉⴳⴳⴰⵎⵎⵉⵢ...' :
                 language === 'dar' ? 'كنحللو...' :
                 'ⴰⵙⵍⴽⴷ ⵉⴳⴳⴰⵎⵎⵉⵢ...') :
                (language === 'ar' ? 'تحليل الصورة' :
                 language === 'ber' ? 'ⵙⵍⴽⴷ ⵜⴰⵡⵍⴰⴼⵜ' :
                 language === 'dar' ? 'تحليل الصورة' :
                 'ⵙⵍⴽⴷ ⵜⴰⵡⵍⴰⴼⵜ')}
            </Button>
          )}
          
          {analysis && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-700">{analysis}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
