import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/Dashboard";
import BYOPPage from "./pages/BYOP";
import RuleEnginePage from "./pages/RuleEngine";
import ServiceConfigPage from "./pages/ServiceConfig";

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
          <Route path="/catalog" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Navigate to="/dashboard" replace state={{ defaultTab: 'products' }} />} />
          <Route path="/categories" element={<Navigate to="/dashboard" replace state={{ defaultTab: 'categories' }} />} />
          <Route path="/inventory" element={<Navigate to="/dashboard" replace state={{ defaultTab: 'inventory' }} />} />
          <Route path="/byop" element={<BYOPPage />} />
          <Route path="/service-config" element={<ServiceConfigPage />} />
          <Route path="/rule-engine" element={<RuleEnginePage />} />
          <Route path="/rule-engine/create" element={<RuleEnginePage mode="create" />} />
          <Route path="/rule-engine/edit/:id" element={<RuleEnginePage mode="edit" />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;