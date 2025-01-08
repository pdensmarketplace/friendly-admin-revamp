import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/Overview";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { CalendarDateRangePicker } from "@/components/dashboard/DateRangePicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CustomerAnalytics } from "@/components/dashboard/CustomerAnalytics";
import { ProductPerformance } from "@/components/dashboard/ProductPerformance";
import { EshopAnalytics } from "@/components/dashboard/EshopAnalytics";
import { useLocation } from "react-router-dom";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  AlertTriangle,
  PhoneCall,
  Signal,
  ShoppingCart,
} from "lucide-react";

export default function DashboardPage() {
  const location = useLocation();
  const defaultTab = location.state?.defaultTab || 'overview';

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 space-y-4 p-8 pt-6 bg-gray-50">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
            </div>
          </div>
          <Tabs defaultValue={defaultTab} className="space-y-4">
            <TabsList className="bg-white">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="e-shop">E-Shop</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-purple-500 to-indigo-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Total Active Customers
                    </CardTitle>
                    <Users className="h-4 w-4 text-white" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">45,231</div>
                    <p className="text-xs text-white/80">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-pink-500 to-rose-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Revenue (ARPU)
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-white" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">$42.50</div>
                    <p className="text-xs text-white/80">
                      +15% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-500 to-amber-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Active Support Tickets
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">124</div>
                    <p className="text-xs text-white/80">
                      -8% from last hour
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-500 to-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">
                      Network Status
                    </CardTitle>
                    <Signal className="h-4 w-4 text-white" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">98.9%</div>
                    <p className="text-xs text-white/80">
                      Uptime last 24h
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="customers" className="space-y-4">
              <CustomerAnalytics />
            </TabsContent>
            <TabsContent value="products" className="space-y-4">
              <ProductPerformance />
            </TabsContent>
            <TabsContent value="e-shop" className="space-y-4">
              <EshopAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
