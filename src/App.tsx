
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analyze from "./pages/Analyze";
import DoctorDashboard from "./pages/DoctorDashboard";
import NotFound from "./pages/NotFound";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => {
  // Function to check if the user is a doctor
  const isDoctorRoute = () => {
    return localStorage.getItem('userType') === 'doctor';
  };

  // Doctor guard component
  const DoctorGuard = ({ children }: { children: React.ReactNode }) => {
    if (!isDoctorRoute()) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthGuard>
                      <Home />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/chatbot"
                  element={
                    <AuthGuard>
                      <Chatbot />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/analyze"
                  element={
                    <AuthGuard>
                      <Analyze />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/doctor-dashboard"
                  element={
                    <AuthGuard>
                      <DoctorGuard>
                        <DoctorDashboard />
                      </DoctorGuard>
                    </AuthGuard>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
