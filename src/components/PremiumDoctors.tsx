
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Lock, Unlock, Search, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  price: number;
  image: string;
  category: string;
  locked: boolean;
}

const PremiumDoctors = () => {
  const { language } = useLanguage();
  const [couponCode, setCouponCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: "doc1",
      name: "د. فاطمة الزهراء",
      specialty: "طب القلب",
      price: 150,
      image: "/placeholder.svg",
      category: "cardiology",
      locked: true
    },
    {
      id: "doc2",
      name: "د. أحمد العلوي",
      specialty: "طب الأطفال",
      price: 120,
      image: "/placeholder.svg",
      category: "pediatrics",
      locked: true
    },
    {
      id: "doc3",
      name: "د. سلمى بنعمر",
      specialty: "طب النساء والتوليد",
      price: 180,
      image: "/placeholder.svg",
      category: "gynecology",
      locked: true
    },
    {
      id: "doc4",
      name: "د. يوسف المراكشي",
      specialty: "الطب النفسي",
      price: 200,
      image: "/placeholder.svg",
      category: "psychology",
      locked: true
    }
  ]);

  const categories = [
    { id: "all", name: { ar: "الكل", ber: "ⴰⴽⵯⵍ", dar: "كلشي", tach: "ⴰⴽⵯⵍ" } },
    { id: "cardiology", name: { ar: "طب القلب", ber: "ⵜⴰⵙⵏⵓⵔⵉⵜ ⵏ ⵓⵍ", dar: "طب القلب", tach: "ⵜⴰⵙⵏⵓⵔⵉⵜ ⵏ ⵓⵍ" } },
    { id: "pediatrics", name: { ar: "طب الأطفال", ber: "ⵜⴰⵙⵏⵓⵔⵉⵜ ⵏ ⵉⵖⵓⵔⴰⵙ", dar: "طب الأطفال", tach: "ⵜⴰⵙⵏⵓⵔⵉⵜ ⵏ ⵉⵖⵓⵔⴰⵙ" } },
    { id: "gynecology", name: { ar: "طب النساء والتوليد", ber: "ⵜⴰⵙⵏⵓⵔⵉⵜ ⵏ ⵜⵎⵖⴰⵔⵉⵏ", dar: "طب النساء والتوليد", tach: "ⵜⴰⵙⵏⵓⵔⵉⵜ ⵏ ⵜⵎⵖⴰⵔⵉⵏ" } },
    { id: "psychology", name: { ar: "الطب النفسي", ber: "ⵜⴰⵙⵏⵓⵔⵉⵜ ⵏ ⵡⴰⴽⵓⴷ", dar: "الطب النفسي", tach: "ⵜⴰⵙⵏⵓⵔⵉⵜ ⵏ ⵡⴰⴽⵓⴷ" } }
  ];

  const handleUnlock = (doctorId: string) => {
    if (couponCode.trim() === "") {
      toast.error(language === 'ar' ? "يرجى إدخال رمز الكوبون" : 
                 language === 'ber' ? "ⵙⵓⵙⵎ ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ" : 
                 language === 'dar' ? "دخل شيفرة الكوبون" : 
                 "ⵙⵓⵙⵎ ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ");
      return;
    }

    // Simulate coupon code verification
    if (couponCode === "DOCTOR123" || couponCode === "PREMIUM456") {
      setDoctors(doctors.map(doc => 
        doc.id === doctorId ? { ...doc, locked: false } : doc
      ));
      toast.success(language === 'ar' ? "تم فتح المساعد الطبي المتخصص بنجاح!" : 
                   language === 'ber' ? "ⵉⵏⵏⵓⵔⵣⵎ ⵓⵎⵙⵜⴰⵡⴰⵔ ⵏ ⵜⵙⵏⵓⵔⵉⵜ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ!" : 
                   language === 'dar' ? "تم فتح المساعد الطبي المتخصص بنجاح!" : 
                   "ⵉⵏⵏⵓⵔⵣⵎ ⵓⵎⵙⵜⴰⵡⵔ ⵏ ⵜⵙⵏⵓⵔⵉⵜ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ!");
      setCouponCode("");
      setSelectedDoctorId(null);
    } else {
      toast.error(language === 'ar' ? "رمز الكوبون غير صالح" : 
                 language === 'ber' ? "ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ ⵓⵔ ⵜⵖⵓⴷ" : 
                 language === 'dar' ? "شيفرة الكوبون ماشي صالحة" : 
                 "ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ ⵓⵔ ⵜⵖⵓⴷ");
    }
  };

  const handleStartChat = (doctorId: string) => {
    toast.success(language === 'ar' ? "تم بدء المحادثة مع المساعد المتخصص" : 
                 language === 'ber' ? "ⵉⴱⴷⴰ ⵓⵎⵙⴰⵡⴰⵍ ⴰⴽⴷ ⵓⵎⵙⵜⴰⵡⴰⵔ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ" : 
                 language === 'dar' ? "تبدات الدردشة مع المساعد المتخصص" : 
                 "ⵉⴱⴷⴰ ⵓⵎⵙⴰⵡⵍ ⴰⴽⴷ ⵓⵎⵙⵜⴰⵡⵔ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ");
  };

  const toggleCouponInput = (doctorId: string) => {
    setSelectedDoctorId(selectedDoctorId === doctorId ? null : doctorId);
    setCouponCode("");
  };

  const filteredDoctors = doctors.filter(doctor => 
    (selectedCategory === "all" || doctor.category === selectedCategory) &&
    (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name[language] : categoryId;
  };

  return (
    <section id="premium-doctors" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          {language === 'ar' ? 'المساعدون المتخصصون' : 
           language === 'ber' ? 'ⵉⵎⵙⵜⴰⵡⴰⵔⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ' :
           language === 'dar' ? 'المساعدين المتخصصين' :
           'ⵉⵎⵙⵜⴰⵡⵔⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ'}
        </h2>
        
        <p className="text-center text-green-600 max-w-2xl mx-auto mb-8">
          {language === 'ar' ? 'تحدث مع مساعد متخصص مدرب على بيانات طبية من أطباء محترفين. تحتاج إلى رمز كوبون للوصول.' : 
           language === 'ber' ? 'ⵙⴰⵡⵍ ⴷ ⵉⵎⵙⵜⴰⵡⴰⵔⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ ⵜⵜⵡⴰⵙⵙⵖⵔⵏ ⵅⴼ ⵉⵙⵓⵖⴰⵍ ⵏ ⵉⵎⵙⵏⴼⴰⵍ. ⵜⵃⵜⴰⵊⵊⴰⴷ ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ ⴰⴼⴰⴷ ⴰⴷ ⵜⴰⵡⵉⴷ.' :
           language === 'dar' ? 'دردش مع مساعد متخصص متدرب على معطيات طبية من أطباء محترفين. محتاج شيفرة كوبون باش توصل.' :
           'ⵙⴰⵡⵍ ⴷ ⵉⵎⵙⵜⴰⵡⵔⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ ⵜⵜⵡⴰⵙⵙⵖⵔⵏ ⵅⴼ ⵉⵙⵓⵖⴰⵍ ⵏ ⵉⵎⵙⵏⴼⴰⵍ. ⵜⵃⵜⴰⵊⵊⴰⴷ ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ ⴰⴼⴰⴷ ⴰⴷ ⵜⴰⵡⵉⴷ.'}
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <Input
              type="text"
              placeholder={
                language === 'ar' ? 'ابحث عن مساعد متخصص...' : 
                language === 'ber' ? 'ⵔⵣⵓ ⵅⴼ ⵓⵎⵙⵜⴰⵡⴰⵔ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ...' :
                language === 'dar' ? 'قلب على مساعد متخصص...' :
                'ⵔⵣⵓ ⵅⴼ ⵓⵎⵙⵜⴰⵡⵔ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-400"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={selectedCategory === category.id ? 
                  "bg-sihati-primary hover:bg-sihati-accent text-white" : 
                  "border-green-200 text-green-700 hover:bg-green-50"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name[language]}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${!doctor.locked ? "border-green-400 shadow-green-100" : ""}`}>
              <div className="relative h-48 bg-green-50">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover"
                />
                {doctor.locked && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Lock className="text-white h-12 w-12" />
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  {doctor.name}
                  {!doctor.locked && <Unlock className="h-4 w-4 text-sihati-primary" />}
                </CardTitle>
                <p className="text-green-600">{doctor.specialty}</p>
                <p className="text-sm text-green-500">{getCategoryName(doctor.category)}</p>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg text-sihati-primary">{doctor.price} MAD</p>
                  
                  {doctor.locked ? (
                    <Button 
                      variant="outline" 
                      className="border-sihati-primary text-sihati-primary" 
                      onClick={() => toggleCouponInput(doctor.id)}
                    >
                      {selectedDoctorId === doctor.id ?
                        (language === 'ar' ? 'إلغاء' : 
                         language === 'ber' ? 'ⵙⵔ' :
                         language === 'dar' ? 'إلغاء' :
                         'ⵙⵔ') :
                        (language === 'ar' ? 'إدخال كوبون' : 
                         language === 'ber' ? 'ⵙⵓⵙⵎ ⴰⴽⵓⴱⵓⵏ' :
                         language === 'dar' ? 'دخل كوبون' :
                         'ⵙⵓⵙⵎ ⴰⴽⵓⴱⵓⵏ')
                      }
                    </Button>
                  ) : (
                    <Button 
                      className="bg-sihati-primary hover:bg-sihati-accent text-white" 
                      onClick={() => handleStartChat(doctor.id)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {language === 'ar' ? 'ابدأ المحادثة' : 
                       language === 'ber' ? 'ⴱⴷⵓ ⴰⵎⵙⴰⵡⴰⵍ' :
                       language === 'dar' ? 'بدا الدردشة' :
                       'ⴱⴷⵓ ⴰⵎⵙⴰⵡⵍ'}
                    </Button>
                  )}
                </div>

                {/* Coupon input only appears for the selected doctor */}
                {selectedDoctorId === doctor.id && (
                  <div className="mt-4 flex gap-2">
                    <Input
                      type="text"
                      placeholder={
                        language === 'ar' ? 'رمز الكوبون' : 
                        language === 'ber' ? 'ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ' :
                        language === 'dar' ? 'شيفرة الكوبون' :
                        'ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ'
                      }
                      className="flex-grow"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button 
                      className="bg-sihati-primary hover:bg-sihati-accent text-white" 
                      onClick={() => handleUnlock(doctor.id)}
                    >
                      {language === 'ar' ? 'فتح' : 
                       language === 'ber' ? 'ⵔⵣⵎ' :
                       language === 'dar' ? 'حل' :
                       'ⵔⵣⵎ'}
                    </Button>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="bg-green-50 text-xs text-green-600">
                {doctor.locked ? (
                  <p>
                    {language === 'ar' ? 'ادفع للوصول أو استخدم رمز الكوبون للفتح' : 
                     language === 'ber' ? 'ⵅⵍⵍⵚ ⵉ ⵓⵏⵓⵔⵣⵎ ⵏⵖ ⵙⵎⵔⵙ ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ ⵉ ⵓⵔⵣⴰⵎ' :
                     language === 'dar' ? 'خلص باش توصل وﻻ استعمل شيفرة الكوبون باش تحل' :
                     'ⵅⵍⵍⵚ ⵉ ⵓⵏⵓⵔⵣⵎ ⵏⵖ ⵙⵎⵔⵙ ⵜⴰⵏⵉⵍⵜ ⵏ ⵓⴽⵓⴱⵓⵏ ⵉ ⵓⵔⵣⴰⵎ'}
                  </p>
                ) : (
                  <p>
                    {language === 'ar' ? 'تم فتح المساعد - استمتع بالمحادثة المتخصصة!' : 
                     language === 'ber' ? 'ⵉⵏⵏⵓⵔⵣⵎ ⵓⵎⵙⵜⴰⵡⴰⵔ - ⵙⵜⵎⵜⵜⵄ ⵙ ⵓⵎⵙⴰⵡⴰⵍ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ!' :
                     language === 'dar' ? 'تحل المساعد - استمتع بالدردشة المتخصصة!' :
                     'ⵉⵏⵏⵓⵔⵣⵎ ⵓⵎⵙⵜⴰⵡⵔ - ⵙⵜⵎⵜⵜⵄ ⵙ ⵓⵎⵙⴰⵡⵍ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ!'}
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumDoctors;
