
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/i18n";
import { ImageAnalysis } from "@/components/ImageAnalysis";
import { NearbyHospitals } from "@/components/NearbyHospitals";
import { useToast } from "@/hooks/use-toast";

const Analyze = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (description.trim().length < 20) {
      toast({
        title: language === 'ar' ? "تنبيه" : "Alert",
        description: language === 'ar' ? "الرجاء إدخال وصف أكثر تفصيلاً (20 حرف على الأقل)" : 
                    "Please enter a more detailed description (at least 20 characters)",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Mock result based on keywords in the description
      const lowerDescription = description.toLowerCase();
      
      if (lowerDescription.includes("صداع") || lowerDescription.includes("headache")) {
        setResult(
          language === 'ar' ? 
          "بناءً على وصفك، قد تكون تعاني من صداع توتري. ننصح بالراحة وشرب الماء بكميات كافية، وتجنب مصادر التوتر إن أمكن. إذا استمر الصداع لأكثر من 3 أيام، يرجى استشارة الطبيب." :
          language === 'ber' ? 
          "ⵙ ⵓⵙⵔⵓⵎⵙ ⵅⴼ ⵓⴳⵍⴰⵎ ⵏⵏⴽ, ⵉⵣⵎⵔ ⴰⴷ ⵜⴰⵏⵏⴰⵢⴷ ⴰⵇⵙⵙⴰⵃ ⵏ ⵓⵣⵍⵍⵓⵎ. ⵏⵜⵜⵏⵚⵃ ⵙ ⵓⵙⵓⵏⴼⵓ ⴷ ⵜⵉⵙⵙⵉ ⵏ ⵡⴰⵎⴰⵏ ⵙ ⵓⵎⴰⵜⴰ ⴷ ⵡⴰⴷⴷⴰ." :
          language === 'dar' ? 
          "على حساب الوصف ديالك، يمكن كتعاني من صداع توتري. كننصحو بالراحة وشرب الماء بكميات كافية، وتجنب مصادر التوتر إلى قدرتي. إلى بقى الصداع كتر من 3 أيام، تواصل مع طبيب." :
          "ⵙ ⵓⵙⵔⵓⵎⵙ ⵅⴼ ⵓⴳⵍⴰⵎ ⵏⵏⴽ, ⵉⵣⵎⵔ ⴰⴷ ⵜⴰⵏⵏⴰⵢⴷ ⴰⵇⵙⵙⴰⵃ ⵏ ⵓⵣⵍⵍⵓⵎ. ⵏⵜⵜⵏⵚⵃ ⵙ ⵓⵙⵓⵏⴼⵓ ⴷ ⵜⵉⵙⵙⵉ ⵏ ⵡⴰⵎⴰⵏ ⵙ ⵓⵎⴰⵜⴰ ⴷ ⵡⴰⴷⴷⴰ."
        );
        
        toast({
          title: language === 'ar' ? "تم التحليل" : "Analysis Complete",
          description: language === 'ar' ? "تم تحليل الأعراض بنجاح" : "Symptoms analyzed successfully",
        });
      } else if (lowerDescription.includes("حمى") || lowerDescription.includes("fever")) {
        setResult(
          language === 'ar' ? 
          "تشير الأعراض التي وصفتها إلى احتمالية الإصابة بعدوى فيروسية. ننصح بالراحة وشرب السوائل بكثرة، واستخدام خافض للحرارة إذا تجاوزت 38.5 درجة مئوية. إذا استمرت الحمى لأكثر من 3 أيام، يرجى استشارة الطبيب." :
          language === 'ber' ? 
          "ⵜⵙⵎⴰⵍ ⵜⵎⴰⵜⴰⵔⵉⵏ ⵏⵏⵉ ⵜⴳⵍⴰⵎⴷ ⵖⵔ ⵜⵉⵣⵎⵔⵜ ⵏ ⵜⴰⵥⵥⵉⵜ ⵜⴰⵙⵎⵓⵜⵜⵉⵜ. ⵏⵜⵜⵏⵚⵃ ⵙ ⵓⵙⵓⵏⴼⵓ ⴷ ⵜⵉⵙⵙⵉ ⵏ ⵉⵎⵙⵙⵉⵏ ⵙ ⵡⴰⵜⵜⴰⵙ." :
          language === 'dar' ? 
          "الأعراض لي وصفتي كتشير لاحتمال الإصابة بعدوى فيروسية. كننصحو بالراحة وشرب السوائل بزاف، واستعمال دوا ديال التبريد إلى تجاوزات 38.5 درجة. إلى بقات الحمى كتر من 3 أيام، تواصل مع طبيب." :
          "ⵜⵙⵎⴰⵍ ⵜⵎⴰⵜⴰⵔⵉⵏ ⵏⵏⵉ ⵜⴳⵍⴰⵎⴷ ⵖⵔ ⵜⵉⵣⵎⵔⵜ ⵏ ⵜⴰⵥⵥⵉⵜ ⵜⴰⵙⵎⵓⵜⵜⵉⵜ. ⵏⵜⵜⵏⵚⵃ ⵙ ⵓⵙⵓⵏⴼⵓ ⴷ ⵜⵉⵙⵙⵉ ⵏ ⵉⵎⵙⵙⵉⵏ ⵙ ⵡⴰⵜⵜⴰⵙ."
        );
        
        toast({
          title: language === 'ar' ? "تم التحليل" : "Analysis Complete",
          description: language === 'ar' ? "تم تحليل الأعراض بنجاح" : "Symptoms analyzed successfully",
        });
      } else {
        setResult(
          language === 'ar' ? 
          "بناءً على المعلومات المقدمة، يصعب تحديد حالة محددة. يرجى تقديم المزيد من التفاصيل حول الأعراض، أو التحدث مباشرة مع مساعدنا الطبي للحصول على تحليل أكثر دقة. نذكرك بأن هذا التحليل أولي ولا يغني عن استشارة الطبيب." :
          language === 'ber' ? 
          "ⵙ ⵓⵙⵔⵓⵎⵙ ⵅⴼ ⵉⵙⴰⵍⵏ ⵉⵜⵜⵓⴼⴽⴰⵏ, ⵉⵃⵔⵛ ⴰⴷ ⵏⵙⵏⴱⴷⵓ ⴰⴷⴷⴰⴷ ⵉⴱⴹⴰⵏ. ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⴼⴽⴷ ⵓⴳⴳⴰⵔ ⵏ ⵜⵢⴰⴼⵓⵜⵉⵏ ⵅⴼ ⵜⵎⴰⵜⴰⵔⵉⵏ." :
          language === 'dar' ? 
          "على حساب المعلومات لي قدمتي، صعيب نحددو حالة معينة. عافاك قدم تفاصيل أكثر على الأعراض، أو دردش مباشرة مع المساعد الطبي ديالنا باش تحصل على تحليل أكثر دقة. كنذكرو بأن هاد التحليل أولي وماكيغنيش على استشارة الطبيب." :
          "ⵙ ⵓⵙⵔⵓⵎⵙ ⵅⴼ ⵉⵙⴰⵍⵏ ⵉⵜⵜⵓⴼⴽⴰⵏ, ⵉⵃⵔⵛ ⴰⴷ ⵏⵙⵏⴱⴷⵓ ⴰⴷⴷⴰⴷ ⵉⴱⴹⴰⵏ. ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⴼⴽⴷ ⵓⴳⴳⴰⵔ ⵏ ⵜⵢⴰⴼⵓⵜⵉⵏ ⵅⴼ ⵜⵎⴰⵜⴰⵔⵉⵏ."
        );
        
        toast({
          title: language === 'ar' ? "تم التحليل" : "Analysis Complete",
          description: language === 'ar' ? "تم تحليل المعلومات المقدمة" : "Provided information analyzed",
        });
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">
        {language === 'ar' ? 'تحليل الحالة الصحية' : 
         language === 'ber' ? 'ⴰⵙⵍⴽⴷ ⵏ ⵡⴰⴷⴷⴰⴷ ⵏ ⵜⵣⵡⵉⵜ' :
         language === 'dar' ? 'تحليل الحالة الصحية' :
         'ⴰⵙⵍⴽⴷ ⵏ ⵡⴰⴷⴷⴰⴷ ⵏ ⵜⴷⵓⵙⵉ'}
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">
        <ImageAnalysis />

        <Card className="border-green-200 shadow-md">
          <CardHeader className="bg-sihati-light">
            <CardTitle className="text-xl text-green-800">
              {language === 'ar' ? 'وصف الحالة الصحية' : 
               language === 'ber' ? 'ⴰⴳⵍⴰⵎ ⵏ ⵡⴰⴷⴷⴰⴷ ⵏ ⵜⵣⵡⵉⵜ' :
               language === 'dar' ? 'وصف الحالة الصحية' :
               'ⴰⴳⵍⴰⵎ ⵏ ⵡⴰⴷⴷⴰⴷ ⵏ ⵜⵣⵡⵉⵜ'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-green-700 mb-4">
              {language === 'ar' ? 
                'يرجى وصف حالتك الطبية أو الأعراض التي تشعر بها:' : 
               language === 'ber' ? 
                'ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⴳⵍⴰⵎⴷ ⴰⴷⴷⴰⴷ ⵏⵏⴽ ⵏ ⵜⵣⵡⵉⵜ ⵏⵉⵖ ⵜⵉⵎⴰⵜⴰⵔⵉⵏ ⵏⵏⴰ ⵜⵜⵉⵏⵉⴷ:' :
               language === 'dar' ? 
                'عافاك وصف الحالة الطبية ديالك أو الأعراض لي كتحس بيهم:' :
                'ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⴳⵍⴰⵎⴷ ⴰⴷⴷⴰⴷ ⵏⵏⴽ ⵏ ⵜⵣⵡⵉⵜ ⵏⵉⵖ ⵜⵉⵎⴰⵜⴰⵔⵉⵏ ⵏⵏⴰ ⵜⵜⵉⵏⵉⴷ:'}
            </p>
            
            <Textarea
              placeholder={
                language === 'ar' ? 'مثال: أعاني من صداع في الجانب الأيمن من الرأس منذ يومين...' : 
                language === 'ber' ? 'ⴰⵎⴷⵢⴰ: ⵜⵜⴰⵏⵏⴰⵢⵖ ⴰⵇⵙⵙⴰⵃ ⴳ ⵉⵖⵉⵔ ⴰⴼⴰⵙⵉ ⵙⴳ ⵓⵣⵍⵍⵓⵎ ⵙⴳ ⵙⵉⵏ ⵡⵓⵙⵙⴰⵏ...' :
                language === 'dar' ? 'مثال: كنعاني من صداع في الجانب اليمني ديال الراس هادي يومين...' :
                'ⴰⵎⴷⵢⴰ: ⵜⵜⴰⵏⵏⴰⵢⵖ ⴰⵇⵙⵙⴰⵃ ⴳ ⵉⵖⵉⵔ ⴰⴼⴰⵙⵉ ⵙⴳ ⵓⵣⵍⵍⵓⵎ ⵙⴳ ⵙⵉⵏ ⵡⵓⵙⵙⴰⵏ...'
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[150px] border-green-200 focus:border-green-400 mb-4"
            />
            
            <div className="flex justify-end">
              <Button 
                className="bg-sihati-primary hover:bg-sihati-accent text-white"
                disabled={isAnalyzing}
                onClick={handleAnalyze}
                type="button"
              >
                {isAnalyzing ? 
                  (language === 'ar' ? "جاري التحليل..." : 
                   language === 'ber' ? "ⴰⵙⵍⴽⴷ ⵉⴳⴳⴰⵎⵎⵉⵢ..." : 
                   language === 'dar' ? "كنحللو..." : 
                   "ⴰⵙⵍⴽⴷ ⵉⴳⴳⴰⵎⵎⵉⵢ...") : 
                  (language === 'ar' ? "تحليل الحالة" : 
                   language === 'ber' ? "ⵙⵍⴽⴷ ⴰⴷⴷⴰⴷ" : 
                   language === 'dar' ? "تحليل الحالة" : 
                   "ⵙⵍⴽⴷ ⴰⴷⴷⴰⴷ")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-green-300 shadow-md bg-green-50">
            <CardHeader className="bg-sihati-light border-b border-green-200">
              <CardTitle className="text-xl text-green-800">
                {language === 'ar' ? 'نتيجة التحليل' : 
                 language === 'ber' ? 'ⴰⴼⴼⵓⵖ ⵏ ⵓⵙⵍⴽⴷ' :
                 language === 'dar' ? 'نتيجة التحليل' :
                 'ⴰⴼⴼⵓⵖ ⵏ ⵓⵙⵍⴽⴷ'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-green-700">{result}</p>
              
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded p-4">
                <p className="text-amber-700 text-sm">
                  {language === 'ar' ? 
                    'تنبيه: هذا التحليل استرشادي فقط ولا يغني عن استشارة الطبيب المختص. يرجى مراجعة الطبيب للحصول على تشخيص دقيق.' : 
                   language === 'ber' ? 
                    'ⴰⵖⴰⵡⴰⵙ: ⴰⵙⵍⴽⴷ ⴰⴷ ⴷ ⴰⵎⵙⵉⵡⴹ ⵖⴰⵙ ⵓⵔ ⵉⵜⵜⵎⵎⵖⵏⴰⵢ ⵅⴼ ⵓⵙⵇⵙⵉ ⵏ ⵓⵎⵙⵓⵏⴼⵓ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ. ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⵣⵔⵉⴷ ⴰⵎⵙⵓⵏⴼⵓ ⴰⴼⴰⴷ ⴰⴷ ⵜⴰⵡⵉⴷ ⴰⵙⵏⵎⴰⵍⴰ ⵓⵙⴷⵉⴷ.' :
                   language === 'dar' ? 
                    'تنبيه: هاد التحليل إرشادي فقط وماكيغنيش على استشارة الطبيب المختص. عافاك راجع الطبيب باش تحصل على تشخيص دقيق.' :
                    'ⴰⵖⴰⵡⴰⵙ: ⴰⵙⵍⴽⴷ ⴰⴷ ⴷ ⴰⵎⵙⵉⵡⴹ ⵖⴰⵙ ⵓⵔ ⵉⵜⵜⵎⵎⵖⵏⴰⵢ ⵅⴼ ⵓⵙⵇⵙⵉ ⵏ ⵓⵎⵙⵓⵏⴼⵓ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ. ⵜⵜⵓⴷⴰⵔⵜ ⴰⴷ ⵜⵣⵔⵉⴷ ⴰⵎⵙⵓⵏⴼⵓ ⴰⴼⴰⴷ ⴰⴷ ⵜⴰⵡⵉⴷ ⴰⵙⵏⵎⴰⵍⴰ ⵓⵙⴷⵉⴷ.'}
                </p>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-sihati-primary text-sihati-primary hover:bg-sihati-light" onClick={() => setResult(null)}>
                  {language === 'ar' ? 'تحليل جديد' : 
                   language === 'ber' ? 'ⴰⵙⵍⴽⴷ ⴰⵎⴰⵢⵏⵓ' :
                   language === 'dar' ? 'تحليل جديد' :
                   'ⴰⵙⵍⴽⴷ ⴰⵎⴰⵢⵏⵓ'}
                </Button>
                <Link to="/chatbot">
                  <Button className="w-full sm:w-auto bg-sihati-primary hover:bg-sihati-accent text-white">
                    {language === 'ar' ? 'التحدث مع مساعدنا الطبي' : 
                     language === 'ber' ? 'ⵙⴰⵡⵍ ⴷ ⵓⵎⵙⵜⴰⵡⴰⵔ ⵏⵏⵖ ⵏ ⵜⵙⵏⵓⵔⵉⵜ' :
                     language === 'dar' ? 'دردش مع المساعد الطبي ديالنا' :
                     'ⵙⴰⵡⵍ ⴷ ⵓⵎⵙⵜⴰⵡⵔ ⵏⵏⵖ ⵏ ⵜⵙⵏⵓⵔⵉⵜ'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <NearbyHospitals />
      </div>
    </div>
  );
};

export default Analyze;
