import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar, 
  Clock,
  ArrowLeft,
  Edit,
  Home,
  FileText,
  PlusCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TenantCard } from "@/components/property/TenantCard";
import { PropertyMaintenanceHistory } from "@/components/property/PropertyMaintenanceHistory";
import { properties } from "@/data/mockDashboardData";
import { mockTenants } from "@/data/mockTenantData";
import { mockMaintenanceRequests } from "@/data/mockMaintenanceData";
import { format } from "date-fns";
import { StatusBadge } from "@/components/maintenance/StatusBadge";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const property = properties.find(p => p.id === Number(id));
  
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold">Property Not Found</h1>
          <p className="mt-4 text-gray-600">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            className="mt-8" 
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const propertyTenants = mockTenants.filter(tenant => tenant.propertyId === property.id);
  
  const propertyMaintenance = mockMaintenanceRequests.filter(
    request => request.propertyId === String(property.id)
  );
  
  const statusColors = {
    "Occupied": "bg-green-100 text-green-800",
    "Vacant": "bg-red-100 text-red-800",
    "Maintenance": "bg-yellow-100 text-yellow-800",
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>
        
        <div className="mb-8 flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/3">
            <div className="overflow-hidden rounded-lg">
              <img
                src={property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                alt={property.name}
                className="h-64 w-full object-cover md:h-72"
              />
            </div>
          </div>
          
          <div className="flex flex-1 flex-col justify-between md:w-2/3">
            <div>
              <div className="flex items-start justify-between">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {property.name}
                </h1>
                <span 
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    statusColors[property.status as keyof typeof statusColors]
                  }`}
                >
                  {property.status}
                </span>
              </div>
              
              <div className="mt-2 flex items-center text-gray-600">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{property.address}</span>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4">
                  <DollarSign className="mb-2 h-5 w-5 text-blue-500" />
                  <span className="text-lg font-semibold">${property.rent}</span>
                  <span className="text-xs text-gray-500">Monthly Rent</span>
                </div>
                
                <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4">
                  <Users className="mb-2 h-5 w-5 text-green-500" />
                  <span className="text-lg font-semibold">{property.tenants}</span>
                  <span className="text-xs text-gray-500">Tenants</span>
                </div>
                
                <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4">
                  <Clock className="mb-2 h-5 w-5 text-orange-500" />
                  <span className="text-lg font-semibold">{propertyMaintenance.length}</span>
                  <span className="text-xs text-gray-500">Maintenance</span>
                </div>
                
                <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4">
                  <Calendar className="mb-2 h-5 w-5 text-purple-500" />
                  <span className="text-lg font-semibold">
                    {property.nextPayment ? format(new Date(property.nextPayment), "MMM d") : "N/A"}
                  </span>
                  <span className="text-xs text-gray-500">Next Payment</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Property
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">
              <Home className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tenants">
              <Users className="mr-2 h-4 w-4" />
              Tenants
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              <Building className="mr-2 h-4 w-4" />
              Maintenance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Overview</CardTitle>
                <CardDescription>Key information about this property</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="font-medium">Residential</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={statusColors[property.status as keyof typeof statusColors]}>
                        {property.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Monthly Rent:</span>
                      <span className="font-medium">${property.rent}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Last Payment:</span>
                      <span className="font-medium">
                        {property.lastPayment 
                          ? format(new Date(property.lastPayment), "MMMM d, yyyy") 
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Next Payment:</span>
                      <span className="font-medium">
                        {property.nextPayment 
                          ? format(new Date(property.nextPayment), "MMMM d, yyyy") 
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-4 text-lg font-medium">Current Occupancy</h3>
                  {property.tenants > 0 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Tenants:</span>
                        <span className="font-medium">{property.tenants}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Occupancy Rate:</span>
                        <span className="font-medium">100%</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Active Leases:</span>
                        <span className="font-medium">{propertyTenants.filter(t => t.status === "active").length}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-md bg-gray-50 p-4 text-center">
                      <p className="text-gray-600">This property is currently vacant</p>
                      <Button className="mt-4" size="sm">Add Tenant</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Maintenance</CardTitle>
                  <CardDescription>Latest maintenance requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {propertyMaintenance.length > 0 ? (
                    <div className="space-y-4">
                      {propertyMaintenance.slice(0, 3).map(request => (
                        <div key={request.id} className="flex items-start justify-between rounded-md border p-4">
                          <div>
                            <h4 className="font-medium">{request.title}</h4>
                            <div className="mt-1 flex gap-2">
                              <StatusBadge status={request.status} />
                              <span className="text-xs text-gray-500">
                                {format(new Date(request.createdAt), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/maintenance?id=${request.id}`)}
                          >
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No maintenance requests found</p>
                  )}
                  
                  {propertyMaintenance.length > 0 && (
                    <Button 
                      variant="link" 
                      className="mt-4 px-0"
                      onClick={() => setActiveTab("maintenance")}
                    >
                      View all maintenance requests
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tenant Summary</CardTitle>
                  <CardDescription>Current and past tenants</CardDescription>
                </CardHeader>
                <CardContent>
                  {propertyTenants.length > 0 ? (
                    <div className="space-y-4">
                      {propertyTenants.slice(0, 2).map(tenant => (
                        <div key={tenant.id} className="flex items-center justify-between rounded-md border p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-full">
                              <img 
                                src={tenant.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                                alt={tenant.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{tenant.name}</h4>
                              <div className="flex items-center gap-2">
                                <Badge variant={tenant.status === "active" ? "default" : "outline"}>
                                  {tenant.status === "active" ? "Active" : "Former"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${tenant.rentAmount}/mo</p>
                            <p className="text-xs text-gray-500">
                              Since {format(new Date(tenant.moveInDate), "MMM yyyy")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No tenants found</p>
                  )}
                  
                  {propertyTenants.length > 0 && (
                    <Button 
                      variant="link" 
                      className="mt-4 px-0"
                      onClick={() => setActiveTab("tenants")}
                    >
                      View all tenants
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tenants" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tenants</CardTitle>
                  <CardDescription>Manage tenants for this property</CardDescription>
                </div>
                <Button>Add Tenant</Button>
              </CardHeader>
              <CardContent>
                {propertyTenants.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {propertyTenants.map(tenant => (
                      <TenantCard key={tenant.id} tenant={tenant} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md bg-gray-50 p-6 text-center">
                    <h3 className="text-lg font-medium">No Tenants</h3>
                    <p className="mt-2 text-gray-600">This property currently has no tenants.</p>
                    <Button className="mt-4">Add Tenant</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Maintenance History</CardTitle>
                  <CardDescription>All maintenance requests for this property</CardDescription>
                </div>
                <Button onClick={() => navigate('/maintenance')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Request
                </Button>
              </CardHeader>
              <CardContent>
                <PropertyMaintenanceHistory maintenanceRequests={propertyMaintenance} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
