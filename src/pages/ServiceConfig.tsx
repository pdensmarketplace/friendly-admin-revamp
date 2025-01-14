import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const ServiceConfigPage = () => {
  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-white p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Service Configuration</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and configure service settings
            </p>
          </div>
          
          {/* Content will be added here in future updates */}
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-500">Service configuration options will appear here</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceConfigPage;