import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { VersionTable } from "@/components/version/VersionTable";
import { Layers, Key, Plus, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddVersionForm } from "@/components/version/AddVersionForm";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleAddVersion = (values: any) => {
    console.log("New version:", values);
    toast({
      title: "Version Added",
      description: "New version has been successfully added.",
    });
  };

  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 flex">
          {/* Side Panel Tabs - Now with improved styling */}
          <div className="w-64 border-r bg-gray-50/80 shadow-sm">
            <Tabs defaultValue="app-version" orientation="vertical" className="h-full">
              <TabsList className="flex flex-col h-auto space-y-1 bg-transparent p-2 border-0 sticky top-0">
                <TabsTrigger 
                  value="app-version"
                  className="w-full justify-start gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary hover:bg-white/80 transition-colors"
                >
                  <Layers className="h-4 w-4" />
                  App Version
                </TabsTrigger>
                <TabsTrigger 
                  value="otp"
                  className="w-full justify-start gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary hover:bg-white/80 transition-colors"
                >
                  <Key className="h-4 w-4" />
                  OTP
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-white">
            <Tabs defaultValue="app-version" orientation="vertical">
              <TabsContent value="app-version" className="m-0 p-6">
                <div className="mb-6">
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
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Version
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Version</DialogTitle>
                      </DialogHeader>
                      <AddVersionForm onSubmit={handleAddVersion} />
                    </DialogContent>
                  </Dialog>
                </div>

                <VersionTable />
              </TabsContent>

              <TabsContent value="otp" className="m-0 p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900">OTP Configuration</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage OTP settings and configurations
                  </p>
                </div>
                {/* OTP content will go here */}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;