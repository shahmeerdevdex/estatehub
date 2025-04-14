
import { Appointment } from "@/types/property";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppointmentTypeBadge } from "./AppointmentTypeBadge";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { format, parseISO } from "date-fns";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

interface AppointmentDetailsProps {
  appointment: Appointment;
  onStatusChange: (id: string, status: 'completed' | 'cancelled') => void;
}

export function AppointmentDetails({ appointment, onStatusChange }: AppointmentDetailsProps) {
  const formattedDate = format(parseISO(appointment.date), 'EEEE, MMMM do, yyyy');
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <CardTitle className="text-xl">{appointment.title}</CardTitle>
            <CardDescription>
              {appointment.propertyName}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <AppointmentTypeBadge type={appointment.type} />
            <AppointmentStatusBadge status={appointment.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium">Description</h4>
          <p className="mt-1 text-gray-600">{appointment.description}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center text-gray-700">
            <CalendarDays className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Date</p>
              <p>{formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Time</p>
              <p>{appointment.startTime} - {appointment.endTime}</p>
            </div>
          </div>
          
          <div className="flex items-center text-gray-700">
            <MapPin className="h-5 w-5 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p>{appointment.propertyName}</p>
            </div>
          </div>
          
          {appointment.attendees && appointment.attendees.length > 0 && (
            <div className="flex items-center text-gray-700">
              <Users className="h-5 w-5 mr-2 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Attendees</p>
                <p>{appointment.attendees.join(', ')}</p>
              </div>
            </div>
          )}
        </div>
        
        {appointment.notes && (
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="font-medium text-sm mb-1">Notes</h4>
            <p className="text-gray-600 text-sm">{appointment.notes}</p>
          </div>
        )}
      </CardContent>
      
      {appointment.status === 'scheduled' && (
        <>
          <Separator />
          <CardFooter className="justify-end gap-2 pt-4">
            <Button 
              variant="outline"
              onClick={() => onStatusChange(appointment.id, 'cancelled')}
            >
              Cancel Appointment
            </Button>
            <Button 
              onClick={() => onStatusChange(appointment.id, 'completed')}
            >
              Mark as Completed
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
