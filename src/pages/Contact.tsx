
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(
      language === 'ar' 
        ? "تم إرسال رسالتك بنجاح" 
        : "Your message has been sent successfully"
    );
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="text-2xl font-bold text-green-800">
            {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'الاسم' : 'Name'}
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="border-green-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="border-green-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'ar' ? 'الرسالة' : 'Message'}
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                className="min-h-[150px] border-green-200"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
                : (language === 'ar' ? 'إرسال' : 'Send')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
