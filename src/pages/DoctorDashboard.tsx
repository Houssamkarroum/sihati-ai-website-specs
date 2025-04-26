
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "../contexts/LanguageContext";
import { Calendar, FileText, User, DollarSign } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  date: string;
  coupons: number;
  revenue: number;
  status: "active" | "completed" | "pending";
}

interface CouponCode {
  code: string;
  used: boolean;
  patient: string | null;
  date: string | null;
}

const DoctorDashboard = () => {
  const { language } = useLanguage();
  const [patientData, setPatientData] = useState<Patient[]>([]);
  const [couponCodes, setCouponCodes] = useState<CouponCode[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [userName, setUserName] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    // Get user data from localStorage
    const storedName = localStorage.getItem("userName") || "";
    const storedSpecialization = localStorage.getItem("doctorSpecialization") || "";
    setUserName(storedName);
    setSpecialization(storedSpecialization);

    // Mock data for demonstration
    const mockPatients: Patient[] = [
      { id: "p1", name: "أحمد محمد", date: "2023-04-20", coupons: 2, revenue: 300, status: "active" },
      { id: "p2", name: "فاطمة علي", date: "2023-04-18", coupons: 1, revenue: 150, status: "completed" },
      { id: "p3", name: "محمد سعيد", date: "2023-04-22", coupons: 0, revenue: 0, status: "pending" },
      { id: "p4", name: "نورة خالد", date: "2023-04-15", coupons: 3, revenue: 450, status: "active" },
    ];
    
    const mockCoupons: CouponCode[] = [
      { code: "DOCTOR123", used: true, patient: "أحمد محمد", date: "2023-04-20" },
      { code: "PREMIUM456", used: true, patient: "فاطمة علي", date: "2023-04-18" },
      { code: "HEALTH789", used: false, patient: null, date: null },
      { code: "NEURO101", used: false, patient: null, date: null },
      { code: "CARDIO202", used: true, patient: "نورة خالد", date: "2023-04-15" },
    ];
    
    setPatientData(mockPatients);
    setCouponCodes(mockCoupons);
    
    // Calculate total revenue
    const total = mockPatients.reduce((sum, patient) => sum + patient.revenue, 0);
    setTotalRevenue(total);
  }, []);

  const handleCreateCoupon = () => {
    if (!newCouponCode.trim()) return;
    
    const newCoupon: CouponCode = {
      code: newCouponCode,
      used: false,
      patient: null,
      date: null
    };
    
    setCouponCodes([...couponCodes, newCoupon]);
    setNewCouponCode("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-sihati-primary">لوحة التحكم للطبيب</h1>
          <div className="flex items-center mt-2">
            <p className="text-lg text-gray-600">{userName}</p>
            <span className="mx-2">|</span>
            <Badge variant="outline" className="text-sihati-primary border-sihati-primary">
              {specialization}
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Card className="bg-sihati-light">
            <CardContent className="p-4 flex items-center">
              <DollarSign className="h-8 w-8 text-sihati-primary mr-2" />
              <div>
                <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-sihati-primary">{totalRevenue} MAD</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center">
            <User className="h-10 w-10 text-sihati-primary mr-4" />
            <div>
              <p className="text-sm text-gray-600">عدد المرضى</p>
              <p className="text-3xl font-bold text-sihati-primary">{patientData.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <FileText className="h-10 w-10 text-sihati-primary mr-4" />
            <div>
              <p className="text-sm text-gray-600">كوبونات مستخدمة</p>
              <p className="text-3xl font-bold text-sihati-primary">
                {couponCodes.filter(c => c.used).length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <Calendar className="h-10 w-10 text-sihati-primary mr-4" />
            <div>
              <p className="text-sm text-gray-600">التاريخ</p>
              <p className="text-xl font-bold text-sihati-primary">
                {new Date().toLocaleDateString('ar-SA')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patients" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="patients" className="flex-1">المرضى</TabsTrigger>
          <TabsTrigger value="coupons" className="flex-1">كوبونات الخصم</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">التحليلات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patients" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>قائمة المرضى</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الاسم</TableHead>
                    <TableHead>تاريخ الانضمام</TableHead>
                    <TableHead>كوبونات مستخدمة</TableHead>
                    <TableHead>الإيرادات</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientData.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.date}</TableCell>
                      <TableCell>{patient.coupons}</TableCell>
                      <TableCell>{patient.revenue} MAD</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status === "active" ? "نشط" :
                           patient.status === "completed" ? "مكتمل" :
                           "قيد الانتظار"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coupons" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الكوبونات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="أدخل رمز الكوبون الجديد"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="max-w-xs"
                />
                <Button onClick={handleCreateCoupon}>إنشاء كوبون</Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>كود الكوبون</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>المريض</TableHead>
                    <TableHead>تاريخ الاستخدام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {couponCodes.map((coupon, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{coupon.code}</TableCell>
                      <TableCell>
                        <Badge variant={coupon.used ? "default" : "outline"} className={coupon.used ? "bg-gray-500" : "text-green-600"}>
                          {coupon.used ? "مستخدم" : "غير مستخدم"}
                        </Badge>
                      </TableCell>
                      <TableCell>{coupon.patient || "-"}</TableCell>
                      <TableCell>{coupon.date || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>تحليلات الاستخدام</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">تحت التطوير - سيتم إضافة رسوم بيانية وتحليلات للاستخدام قريبًا.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
