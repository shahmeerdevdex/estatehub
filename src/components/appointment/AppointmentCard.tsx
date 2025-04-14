
import { Appointment } from "@/types/property";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentTypeBadge } from "./AppointmentTypeBadge";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { Clock, CalendarDays, MapPin } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

interface AppointmentCardProps {
  appointment: Appointment;
  onSelect: (id: string) => void;
}

export function AppointmentCard({ appointment, onSelect }: AppointmentCardProps) {
  const formattedDate = format(parseISO(appointment.date), 'EEEE, MMMM do, yyyy');
  
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{appointment.title}</CardTitle>
          <div className="flex gap-2 items-center">
            <AppointmentTypeBadge type={appointment.type} />
            <AppointmentStatusBadge status={appointment.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">{appointment.description}</p>
          
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-2 h-4 w-4" />
              <span>{appointment.startTime} - {appointment.endTime}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{appointment.propertyName}</span>
          </div>
          
          {appointment.notes && (
            <p className="text-sm italic text-gray-500 pt-2">
              Note: {appointment.notes}
            </p>
          )}
          
          <div className="pt-3 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => onSelect(appointment.id)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
