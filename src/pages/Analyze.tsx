import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { analyzeImage, getMedicationAdvice, findSpecialist, findHospitals } from "../lib/api";

const Analyze = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageResult, setImageResult] = useState<{
    content: string;
    translation: string;
  } | null>(null);
  const [textResult, setTextResult] = useState<{
    content: string;
    translation: string;
  } | null>(null);
  const [specialistResult, setSpecialistResult] = useState<{
    content: string;
    translation: string;
  } | null>(null);
  const [hospitalResult, setHospitalResult] = useState<{
    location: string;
    facilities: {
      name: string;
      latitude: number;
      longitude: number;
      maps_link: string;
    }[];
    count: number;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [illness, setIllness] = useState("");
  const [location, setLocation] = useState("");

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    try {
      const response = await analyzeImage(selectedFile, language);
      setImageResult({
        content: response.diagnosis,
        translation: response.translation
      });
      
      toast({
        title: language === 'ar' ? "تم التحليل" : "Analysis Complete",
        description: language === 'ar' ? "تم تحليل الصورة بنجاح" : "Image analyzed successfully",
      });
    } catch (error) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "حدث خطأ أثناء تحليل الصورة" 
          : "Error analyzing image",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTextAnalyze = async () => {
    if (description.trim().length < 20) {
      toast({
        title: language === 'ar' ? "تنبيه" : "Alert",
        description: language === 'ar' 
          ? "الرجاء إدخال وصف أكثر تفصيلاً (20 حرف على الأقل)" 
          : "Please enter a more detailed description (at least 20 characters)",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await getMedicationAdvice(description, language);
      setTextResult({
        content: response.advice,
        translation: response.translation
      });
      
      toast({
        title: language === 'ar' ? "تم التحليل" : "Analysis Complete",
        description: language === 'ar' ? "تم تحليل الأعراض بنجاح" : "Symptoms analyzed successfully",
      });
    } catch (error) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "حدث خطأ أثناء التحليل" 
          : "Error during analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFindSpecialist = async () => {
    if (!illness.trim()) {
      toast({
        title: language === 'ar' ? "تنبيه" : "Alert",
        description: language === 'ar' 
          ? "الرجاء إدخال الحالة المرضية" 
          : "Please enter the medical condition",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await findSpecialist(illness, language);
      setSpecialistResult({
        content: response.specialist,
        translation: response.translation
      });
      
      toast({
        title: language === 'ar' ? "تم البحث" : "Search Complete",
        description: language === 'ar' ? "تم العثور على الاختصاصي المناسب" : "Found appropriate specialist",
      });
    } catch (error) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "حدث خطأ أثناء البحث عن الاختصاصي" 
          : "Error finding specialist",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFindHospitals = async () => {
    if (!location.trim()) {
      toast({
        title: language === 'ar' ? "تنبيه" : "Alert",
        description: language === 'ar' 
          ? "الرجاء إدخال موقع للبحث" 
          : "Please enter a location to search",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await findHospitals(location);
      setHospitalResult({
        location: location,
        facilities: response.facilities,
        count: response.facilities.length
      });
      
      toast({
        title: language === 'ar' ? "تم البحث" : "Search Complete",
        description: language === 'ar' 
          ? `تم العثور على ${response.facilities.length} منشأة طبية` 
          : `Found ${response.facilities.length} medical facilities`,
      });
    } catch (error) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "حدث خطأ أثناء البحث عن المستشفيات" 
          : "Error searching for hospitals",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">
        {language === 'ar' ? 'تحليل الحالة الصحية' : 'Health Analysis'}
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Image Analysis Section */}
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
              onClick={handleImageUpload}
            >
              {isAnalyzing ? 
                (language === 'ar' ? "جاري التحليل..." : "Analyzing...") : 
                (language === 'ar' ? "تحليل الصورة" : "Analyze Image")}
            </Button>

            {/* Image Results */}
            {imageResult && (
              <div className="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 'نتيجة تحليل الصورة' : 'Image Analysis Result'}
                </h3>
                <div className="mb-4">
                  <h4 className="font-medium mb-1">
                    {language === 'ar' ? 'باللغة العربية:' : 'In Arabic:'}
                  </h4>
                  <p className="text-right" dir="rtl">
                    {imageResult.translation}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {language === 'ar' ? 'بالإنجليزية:' : 'In English:'}
                  </h4>
                  <p>{imageResult.content}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Text Analysis Section */}
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
                onClick={handleTextAnalyze}
              >
                {isAnalyzing ? 
                  (language === 'ar' ? "جاري التحليل..." : "Analyzing...") : 
                  (language === 'ar' ? "تحليل النص" : "Analyze Text")}
              </Button>
            </div>

            {/* Text Results */}
            {textResult && (
              <div className="mt-4 p-4 border border-green-200 rounded-lg bg-green-50">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 'نتيجة تحليل النص' : 'Text Analysis Result'}
                </h3>
                <div className="mb-4">
                  <h4 className="font-medium mb-1">
                    {language === 'ar' ? 'باللغة العربية:' : 'In Arabic:'}
                  </h4>
                  <p className="text-right" dir="rtl">
                    {textResult.translation}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {language === 'ar' ? 'بالإنجليزية:' : 'In English:'}
                  </h4>
                  <p>{textResult.content}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Find Specialist Section */}
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
                onClick={handleFindSpecialist}
              >
                {isAnalyzing ? 
                  (language === 'ar' ? "جاري البحث..." : "Searching...") : 
                  (language === 'ar' ? "البحث عن أخصائي" : "Find Specialist")}
              </Button>
            </div>

            {/* Specialist Results */}
            {specialistResult && (
              <div className="mt-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 'الاختصاصي المناسب' : 'Recommended Specialist'}
                </h3>
                <div className="mb-4">
                  <h4 className="font-medium mb-1">
                    {language === 'ar' ? 'باللغة العربية:' : 'In Arabic:'}
                  </h4>
                  <p className="text-right" dir="rtl">
                    {specialistResult.translation}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {language === 'ar' ? 'بالإنجليزية:' : 'In English:'}
                  </h4>
                  <p>{specialistResult.content}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Find Hospitals Section */}
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
                onClick={handleFindHospitals}
              >
                {language === 'ar' ? 'بحث' : 'Search'}
              </Button>
            </div>
            
            {/* Hospital Results */}
            {hospitalResult && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">
                  {language === 'ar' ? 
                    `تم العثور على ${hospitalResult.count} منشأة طبية في ${hospitalResult.location}` : 
                    `Found ${hospitalResult.count} medical facilities in ${hospitalResult.location}`}
                </h3>
                <ul className="space-y-2">
                  {hospitalResult.facilities.map((hospital, index) => (
                    <li key={index} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                      <a 
                        href={hospital.maps_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline"
                      >
                        {hospital.name}
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        {language === 'ar' ? 'الموقع:' : 'Location:'} {hospital.latitude}, {hospital.longitude}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analyze;


