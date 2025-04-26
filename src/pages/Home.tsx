
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-sihati-light py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              صحتي AI
            </h1>
            <p className="text-xl md:text-2xl text-sihati-secondary max-w-2xl mb-8">
              مستشارك الصحي الذكي الذي يساعدك على الاهتمام بصحتك بشكل أفضل
            </p>
            <Link to="/chatbot">
              <Button className="text-lg px-8 py-6 bg-sihati-primary hover:bg-sihati-accent transition-colors">
                ابدأ المحادثة الآن
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">كيف يساعدك صحتي AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-sihati-light p-4 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sihati-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">استشارات صحية فورية</h3>
              <p className="text-sihati-secondary">
                احصل على إجابات فورية لأسئلتك الصحية من خلال محادثة ذكية مع مستشارك الصحي
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-sihati-light p-4 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sihati-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">معلومات موثوقة</h3>
              <p className="text-sihati-secondary">
                نقدم معلومات صحية دقيقة وموثوقة تساعدك على اتخاذ قرارات صحية أفضل
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-sihati-light p-4 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sihati-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">متاح على مدار الساعة</h3>
              <p className="text-sihati-secondary">
                الوصول إلى المساعدة الصحية في أي وقت ومن أي مكان، على مدار الساعة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sihati-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">جاهز للبدء؟</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            انضم إلى الآلاف من المستخدمين الذين يعتمدون على صحتي AI للحصول على مشورة صحية موثوقة
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-sihati-primary hover:bg-gray-100 transition-colors">
                إنشاء حساب
              </Button>
            </Link>
            <Link to="/chatbot">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 transition-colors">
                جرب المحادثة
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
