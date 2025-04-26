
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center fade-in">
        <h1 className="text-6xl font-bold mb-4 text-sihati-primary">404</h1>
        <p className="text-2xl text-gray-600 mb-8">عذرًا، الصفحة غير موجودة</p>
        <Link to="/">
          <Button className="bg-sihati-primary hover:bg-sihati-accent transition-colors">
            العودة إلى الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
