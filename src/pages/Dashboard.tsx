
import { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PropertyStatsCard } from '@/components/dashboard/PropertyStatsCard';
import { PropertiesTable } from '@/components/dashboard/PropertiesTable';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { ActivityItem } from '@/components/dashboard/ActivityItem';
import { PaymentsTable } from '@/components/dashboard/PaymentsTable';
import { 
  Building, 
  Users, 
  Clock, 
  DollarSign, 
  ChevronDown, 
  BarChart4,
  Calendar,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { properties, activities, tasks, payments } from '@/data/mockDashboardData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate total rent
  const totalRent = properties.reduce((sum, property) => sum + property.rent, 0);
  
  // Count total tenants
  const totalTenants = properties.reduce((sum, property) => sum + property.tenants, 0);
  
  // Count vacant properties
  const vacantProperties = properties.filter(property => property.status === "Vacant").length;
  
  // Count active maintenance requests
  const maintenanceRequests = properties.reduce(
    (sum, property) => sum + (property.maintenanceRequests || 0), 
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="pt-16">
        {/* Dashboard Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="font-display text-2xl font-bold text-gray-900 md:text-3xl">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">Welcome back! Here's what's happening with your properties.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button size="sm">
                  Add Property
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <PropertyStatsCard 
                  title="Properties" 
                  value={properties.length} 
                  icon={Building} 
                  colorClass="text-blue-500 bg-blue-100" 
                />
                <PropertyStatsCard 
                  title="Tenants" 
                  value={totalTenants} 
                  icon={Users} 
                  colorClass="text-green-500 bg-green-100" 
                />
                <PropertyStatsCard 
                  title="Tasks" 
                  value={tasks.length} 
                  icon={Clock} 
                  colorClass="text-orange-500 bg-orange-100" 
                />
                <PropertyStatsCard 
                  title="Monthly Revenue" 
                  value={`$${totalRent.toLocaleString()}`} 
                  icon={DollarSign} 
                  colorClass="text-purple-500 bg-purple-100" 
                />
              </div>
              
              {/* Properties and Tasks */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Properties Overview */}
                <div className="col-span-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl font-bold">Properties Overview</CardTitle>
                      <Button variant="ghost" size="sm">
                        View All
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <PropertiesTable properties={properties.slice(0, 4)} />
                    </CardContent>
                  </Card>
                </div>
                
                {/* Upcoming Tasks */}
                <div className="col-span-1">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-bold">Upcoming Tasks</CardTitle>
                      <CardDescription>Tasks that need your attention</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            title={task.title}
                            dueDate={task.dueDate}
                            type={task.type}
                          />
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 px-6 py-4">
                      <Button variant="outline" className="w-full">
                        View All Tasks
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {activities.map((activity) => (
                      <ActivityItem
                        key={activity.id}
                        title={activity.title}
                        description={activity.description}
                        time={activity.time}
                        type={activity.type}
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-4">
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="properties" className="space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">All Properties</CardTitle>
                  <Button>Add Property</Button>
                </CardHeader>
                <CardContent>
                  <PropertiesTable properties={properties} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-xl font-bold">Payment History</CardTitle>
                    <CardDescription>Showing recent payments for all properties</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Filter by Date
                    </Button>
                    <Button size="sm">Record Payment</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <PaymentsTable payments={payments} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks" className="space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-xl font-bold">All Tasks</CardTitle>
                    <CardDescription>Tasks that need your attention</CardDescription>
                  </div>
                  <Button>Add Task</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <div key={task.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                task.type === "Inspection" ? "bg-blue-100 text-blue-800" : 
                                task.type === "Payment" ? "bg-green-100 text-green-800" : 
                                task.type === "Maintenance" ? "bg-orange-100 text-orange-800" : 
                                "bg-purple-100 text-purple-800"
                              }`}>
                                {task.type}
                              </span>
                              <span className={`ml-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                task.priority === "High" ? "bg-red-100 text-red-800" : 
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                                {task.priority} Priority
                              </span>
                            </div>
                            <h3 className="mt-2 text-base font-medium">{task.title}</h3>
                            <p className="text-sm text-gray-500">{task.description}</p>
                            <div className="mt-2 flex items-center">
                              <span className="text-xs text-gray-500">For: {task.property}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Mark Complete</Button>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
