
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { MaintenanceRequestForm } from "@/components/maintenance/MaintenanceRequestForm";
import { MaintenanceRequestList } from "@/components/maintenance/MaintenanceRequestList";
import { MaintenanceRequestDetails } from "@/components/maintenance/MaintenanceRequestDetails";
import { MaintenanceRequest } from "@/types/maintenance";
import { mockMaintenanceRequests } from "@/data/mockMaintenanceData";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { properties } from "@/data/mockDashboardData";
import { useSearchParams } from "react-router-dom";

// Map properties for the form
const propertyOptions = properties.map(property => ({
  id: String(property.id),
  name: property.name
}));

export default function MaintenanceRequests() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestIdFromUrl = searchParams.get("id");
  
  const [activeTab, setActiveTab] = useState("existing");
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockMaintenanceRequests);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(requestIdFromUrl);
  
  // Get the selected request
  const selectedRequest = selectedRequestId 
    ? requests.find(request => request.id === selectedRequestId) 
    : null;
  
  // Handle form submission for new maintenance request
  const handleSubmitRequest = async (values: any) => {
    // In a real app, this would be an API call
    const newRequest: MaintenanceRequest = {
      id: `m${requests.length + 1}`,
      propertyId: values.propertyId,
      propertyName: propertyOptions.find(p => p.id === values.propertyId)?.name || "",
      title: values.title,
      description: values.description,
      category: values.category,
      priority: values.priority,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add the new request to state
    setRequests([newRequest, ...requests]);
    
    // Switch to the existing requests tab and select the new request
    setActiveTab("existing");
    setSelectedRequestId(newRequest.id);
    
    return Promise.resolve();
  };
  
  // Handle status change for a request
  const handleStatusChange = (requestId: string, newStatus: 'cancelled') => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: newStatus, 
            updatedAt: new Date().toISOString() 
          } 
        : request
    ));
    
    toast({
      title: "Request updated",
      description: `The maintenance request has been ${newStatus}`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Maintenance Requests</h1>
          <p className="mt-2 text-gray-600">
            Submit and track maintenance requests for your properties.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="existing">My Requests</TabsTrigger>
              <TabsTrigger value="new">New Request</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="existing" className="space-y-6">
            {selectedRequest ? (
              <div>
                <Button 
                  variant="outline" 
                  className="mb-4"
                  onClick={() => {
                    setSelectedRequestId(null);
                    setSearchParams({});
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to all requests
                </Button>
                <MaintenanceRequestDetails 
                  request={selectedRequest} 
                  onStatusChange={handleStatusChange}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">All Maintenance Requests</h2>
                  <Button onClick={() => setActiveTab("new")}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Request
                  </Button>
                </div>
                
                <MaintenanceRequestList 
                  requests={requests} 
                  onSelect={(id) => {
                    setSelectedRequestId(id);
                    setSearchParams({ id });
                  }}
                  selectedRequestId={selectedRequestId}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="new">
            <div className="max-w-2xl">
              <MaintenanceRequestForm 
                properties={propertyOptions} 
                onSubmit={handleSubmitRequest} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
