
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("يرجى إدخال الاسم الكامل");
      return false;
    }
    if (!email.trim()) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return false;
    }
    if (!password.trim() || password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون ٦ أحرف على الأقل");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return false;
    }
    if (userType === "doctor" && !specialization.trim()) {
      toast.error("يرجى إدخال التخصص");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      // Set authentication state
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", userType);
      localStorage.setItem("userName", name);
      
      if (userType === "doctor") {
        localStorage.setItem("doctorSpecialization", specialization);
      }
      
      toast.success("تم إنشاء الحساب بنجاح!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-16 fade-in">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="أعد إدخال كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label>نوع الحساب</Label>
              <RadioGroup 
                value={userType} 
                onValueChange={setUserType}
                className="flex flex-row gap-6 pt-2"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient" className="cursor-pointer">مريض</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="doctor" id="doctor" />
                  <Label htmlFor="doctor" className="cursor-pointer">طبيب</Label>
                </div>
              </RadioGroup>
            </div>
            
            {userType === "doctor" && (
              <div className="space-y-2">
                <Label htmlFor="specialization">التخصص</Label>
                <Input
                  id="specialization"
                  type="text"
                  placeholder="أدخل تخصصك الطبي"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-sihati-primary hover:bg-sihati-accent transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sihati-secondary">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-sihati-primary hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
