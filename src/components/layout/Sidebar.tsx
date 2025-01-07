import { cn } from "@/lib/utils";
import {
  BarChart2,
  Box,
  Building2,
  Globe,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
  Store,
  Package,
  CreditCard,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Product Catalog", href: "/products", icon: Box },
  { name: "Inventory & Orders", href: "/inventory", icon: ShoppingCart },
  { name: "E-Shop", href: "/e-shop", icon: Store },
  { name: "Products", href: "/e-shop/products", icon: Package },
  { name: "Orders", href: "/e-shop/orders", icon: CreditCard },
  { name: "Platform Config", href: "/platform", icon: Settings },
  { name: "Integrations", href: "/integrations", icon: Globe },
  { name: "Subscribers", href: "/subscribers", icon: Users },
  { name: "Dealers", href: "/dealers", icon: Building2 },
  { name: "B2B Self-care", href: "/b2b", icon: MessageSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
];

export const Sidebar = () => {
  return (
    <div className="flex h-full w-64 flex-col bg-primary">
      <div className="flex h-16 items-center gap-2 px-6 text-white">
        <Home className="h-6 w-6" />
        <span className="font-semibold">TEC COCKPIT</span>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-white"
                  : "text-gray-300 hover:bg-primary-foreground/10 hover:text-white"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};