
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/i18n";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const validateForm = () => {
    if (!email.trim()) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return false;
    }
    if (!password.trim() || password.length < 6) {
      toast.error("يرجى إدخال كلمة مرور صحيحة (٦ أحرف على الأقل)");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Set authentication state
      localStorage.setItem("isAuthenticated", "true");
      toast.success("تم تسجيل الدخول بنجاح!");

      // Get the redirect path from location state or default to home
      const from = (location.state as { from?: string })?.from || "/";
      navigate(from);
    }, 1000);
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-16 fade-in">
      <Card className="shadow-lg border-green-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-700">{getTranslation('login', language)}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-700">{getTranslation('email', language)}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-green-200 focus:border-green-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-700">{getTranslation('password', language)}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-green-200 focus:border-green-400"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-sihati-primary hover:bg-sihati-accent text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 
                (language === 'ar' ? "جاري تسجيل الدخول..." : 
                 language === 'ber' ? "ⴰⵙⵙⵯⴽⵛⵎ..." : 
                 language === 'dar' ? "كندخل..." : 
                 "ⵉⴳⴳⵯⴰⵎⵎⵉⵢ...") : 
                getTranslation('login', language)}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
