import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/Dashboard";
import BYOPPage from "./pages/BYOP";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/e-shop" element={<Navigate to="/dashboard" replace state={{ defaultTab: 'e-shop' }} />} />
          <Route path="/customers" element={<Navigate to="/dashboard" replace state={{ defaultTab: 'customers' }} />} />
          <Route path="/products" element={<Navigate to="/dashboard" replace state={{ defaultTab: 'products' }} />} />
          <Route path="/byop" element={<BYOPPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;