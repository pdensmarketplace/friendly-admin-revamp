import { cn } from "@/lib/utils";
import {
  BarChart2,
  Box,
  ChevronDown,
  ChevronUp,
  Home,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  Package,
  Cog,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

type SubMenuItem = {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type MenuItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubMenuItem[];
};

const navigation: MenuItem[] = [
  { name: "Dashboard", href: "/", icon: Home },
  { 
    name: "Product Catalog", 
    href: "/catalog", 
    icon: Box,
    subItems: [
      { name: "Products", href: "/products" },
      { name: "Categories", href: "/categories" }
    ]
  },
  { name: "Inventory & Orders", href: "/inventory", icon: ShoppingCart },
  { name: "Platform Config", href: "/platform", icon: Settings },
  { name: "Service Config", href: "/service-config", icon: Cog },
  { name: "Subscribers", href: "/subscribers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
];

export const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="flex h-full w-64 flex-col bg-[#0F172A]">
      <div className="flex h-16 items-center gap-2 px-6 text-white">
        <span className="font-semibold text-xl">TEC COCKPIT</span>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div className="mb-1">
                <button
                  onClick={() => toggleExpand(item.name)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
                    expandedItems.includes(item.name) && "bg-gray-800 text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  {expandedItems.includes(item.name) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {expandedItems.includes(item.name) && (
                  <div className="ml-9 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.href}
                        className={({ isActive }) =>
                          cn(
                            "block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors",
                            isActive && "bg-gray-800 text-white"
                          )
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};