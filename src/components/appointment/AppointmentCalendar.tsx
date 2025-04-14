
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Appointment } from "@/types/property";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentTypeBadge } from "./AppointmentTypeBadge";
import { parseISO } from "date-fns";

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onSelectDate: (date: Date | undefined) => void;
  onSelectAppointment: (id: string) => void;
  selectedDate: Date | undefined;
}

export function AppointmentCalendar({
  appointments,
  onSelectDate,
  onSelectAppointment,
  selectedDate,
}: AppointmentCalendarProps) {
  // Get unique dates that have appointments
  const appointmentDates = appointments.map((apt) => parseISO(apt.date));
  
  // Get appointments for selected date
  const getAppointmentsForDate = (date: Date | undefined) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter((apt) => apt.date === dateStr);
  };
  
  const appointmentsForSelectedDate = getAppointmentsForDate(selectedDate);
  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="col-span-1">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Appointment Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onSelectDate}
              className="rounded-md border p-3 pointer-events-auto"
              modifiers={{
                hasAppointment: appointmentDates,
              }}
              modifiersStyles={{
                hasAppointment: {
                  backgroundColor: "#EBF5FF",
                  fontWeight: "bold",
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="col-span-1 md:col-span-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {selectedDate
                ? `Appointments for ${selectedDate.toLocaleDateString()}`
                : "Select a date to view appointments"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate && appointmentsForSelectedDate.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No appointments scheduled for this date.
              </p>
            ) : (
              <ul className="space-y-2">
                {appointmentsForSelectedDate.map((apt) => (
                  <li 
                    key={apt.id}
                    className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => onSelectAppointment(apt.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{apt.title}</p>
                        <p className="text-sm text-gray-500">
                          {apt.startTime} - {apt.endTime} • {apt.propertyName}
                        </p>
                      </div>
                      <AppointmentTypeBadge type={apt.type} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
