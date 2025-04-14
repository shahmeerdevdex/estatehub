
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { mockAppointments } from "@/data/mockAppointmentData";
import { Appointment } from "@/types/property";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { AppointmentCard } from "@/components/appointment/AppointmentCard";
import { AppointmentDetails } from "@/components/appointment/AppointmentDetails";
import { AppointmentCalendar } from "@/components/appointment/AppointmentCalendar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { properties } from "@/data/mockDashboardData";
import { PlusCircle, ArrowLeft, Calendar } from "lucide-react";
import { useSearchParams } from "react-router-dom";

// Map properties for the form
const propertyOptions = properties.map(property => ({
  id: String(property.id),
  name: property.name
}));

export default function Appointments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestIdFromUrl = searchParams.get("id");
  
  const [activeTab, setActiveTab] = useState("list");
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(requestIdFromUrl);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  // Get the selected appointment
  const selectedAppointment = selectedAppointmentId 
    ? appointments.find(appointment => appointment.id === selectedAppointmentId) 
    : null;
  
  // Handle form submission for new appointment
  const handleSubmitAppointment = async (values: any) => {
    // In a real app, this would be an API call
    const propertyData = propertyOptions.find(p => p.id === values.propertyId);
    
    const newAppointment: Appointment = {
      id: `apt${appointments.length + 1}`,
      propertyId: Number(values.propertyId),
      propertyName: propertyData?.name || "",
      title: values.title,
      description: values.description,
      date: values.date.toISOString().split('T')[0],
      startTime: values.startTime,
      endTime: values.endTime,
      type: values.type,
      status: "scheduled",
      notes: values.notes || undefined,
      attendees: values.attendees ? values.attendees.split(',').map((s: string) => s.trim()) : undefined,
    };
    
    // Add the new appointment to state
    setAppointments([newAppointment, ...appointments]);
    
    // Switch to the list tab and select the new appointment
    setActiveTab("list");
    setSelectedAppointmentId(newAppointment.id);
    setSearchParams({ id: newAppointment.id });
    
    toast({
      title: "Appointment scheduled",
      description: `Your appointment has been scheduled for ${new Date(newAppointment.date).toLocaleDateString()}`,
    });
    
    return Promise.resolve();
  };
  
  // Handle status change for an appointment
  const handleStatusChange = (appointmentId: string, newStatus: 'completed' | 'cancelled') => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { 
            ...appointment, 
            status: newStatus
          } 
        : appointment
    ));
    
    toast({
      title: "Appointment updated",
      description: `The appointment has been marked as ${newStatus}`,
    });
  };
  
  // Handle selecting a date in the calendar view
  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedAppointmentId(null);
    setSearchParams({});
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Appointment Scheduling</h1>
          <p className="mt-2 text-gray-600">
            Schedule and manage property inspections and maintenance visits.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="list">Appointments</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="new">Schedule New</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="list" className="space-y-6">
            {selectedAppointment ? (
              <div>
                <Button 
                  variant="outline" 
                  className="mb-4"
                  onClick={() => {
                    setSelectedAppointmentId(null);
                    setSearchParams({});
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to all appointments
                </Button>
                <AppointmentDetails 
                  appointment={selectedAppointment} 
                  onStatusChange={handleStatusChange}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">All Appointments</h2>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("calendar")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Calendar View
                    </Button>
                    <Button onClick={() => setActiveTab("new")}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Appointment
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onSelect={(id) => {
                        setSelectedAppointmentId(id);
                        setSearchParams({ id });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("new")}
                className="mb-4"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Schedule New Appointment
              </Button>
            </div>
            
            <AppointmentCalendar
              appointments={appointments}
              onSelectDate={handleSelectDate}
              onSelectAppointment={(id) => {
                setSelectedAppointmentId(id);
                setSearchParams({ id });
                setActiveTab("list");
              }}
              selectedDate={selectedDate}
            />
          </TabsContent>
          
          <TabsContent value="new">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold mb-6">Schedule New Appointment</h2>
              <AppointmentForm 
                properties={propertyOptions} 
                onSubmit={handleSubmitAppointment} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
