
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const NearbyHospitals = () => {
  const { language } = useLanguage();
  const [location, setLocation] = useState("");
  const [hospitals, setHospitals] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchHospitals = () => {
    if (!location) return;
    
    setIsSearching(true);
    // Simulate hospital search
    setTimeout(() => {
      setHospitals([
        'مستشفى الملك فهد التخصصي',
        'مستشفى الملك فيصل التخصصي',
        'المستشفى السعودي الألماني',
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <Card className="border-green-200 shadow-md">
      <CardHeader className="bg-sihati-light">
        <CardTitle className="text-xl text-green-800">
          {language === 'ar' ? 'المستشفيات القريبة' :
           language === 'ber' ? 'ⵉⵙⴱⵉⴹⴰⵕⵏ ⵢⵓⴷⵙⵏ' :
           language === 'dar' ? 'المستشفيات القريبة' :
           'ⵉⵙⴱⵉⴹⴰⵕⵏ ⵢⵓⴷⵙⵏ'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder={
                language === 'ar' ? 'أدخل موقعك أو رمز المنطقة' :
                language === 'ber' ? 'ⵙⵉⴷⴼ ⴰⴷⵖⴰⵔ ⵏⵏⴽ ⵏⵉⵖ ⵜⴰⵎⴰⵜⴰⵔⵜ ⵏ ⵜⵙⴳⴰ' :
                language === 'dar' ? 'دخل الموقع ديالك ولا الرمز ديال المنطقة' :
                'ⵙⵉⴷⴼ ⴰⴷⵖⴰⵔ ⵏⵏⴽ ⵏⵉⵖ ⵜⴰⵎⴰⵜⴰⵔⵜ ⵏ ⵜⵙⴳⴰ'
              }
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button 
              className="bg-sihati-primary hover:bg-sihati-accent text-white"
              onClick={searchHospitals}
              disabled={!location || isSearching}
            >
              <MapPin className="h-4 w-4 mr-2" />
              {isSearching ? 
                (language === 'ar' ? 'جاري البحث...' :
                 language === 'ber' ? 'ⴰⵔⵣⵣⵓ ⵉⴳⴳⴰⵎⵎⵉⵢ...' :
                 language === 'dar' ? 'كنقلبو...' :
                 'ⴰⵔⵣⵣⵓ ⵉⴳⴳⴰⵎⵎⵉⵢ...') :
                (language === 'ar' ? 'بحث' :
                 language === 'ber' ? 'ⵔⵣⵓ' :
                 language === 'dar' ? 'قلب' :
                 'ⵔⵣⵓ')}
            </Button>
          </div>
          
          {hospitals.length > 0 && (
            <div className="space-y-2">
              {hospitals.map((hospital, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-green-700">{hospital}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
