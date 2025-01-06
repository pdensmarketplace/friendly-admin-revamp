import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { VersionTable } from "@/components/version/VersionTable";
import { Plus, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">App Version Configuration</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and configure different versions of your application
            </p>
          </div>

          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search versions..."
                className="pl-10"
              />
            </div>
            
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Version
            </Button>
          </div>

          <VersionTable />
        </main>
      </div>
    </div>
  );
};

export default Index;