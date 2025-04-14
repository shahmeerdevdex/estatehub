
import { Appointment } from "@/types/property";
import { addDays } from "date-fns";

// Generate dates starting from tomorrow
const tomorrow = addDays(new Date(), 1);
const nextWeek = addDays(new Date(), 7);
const twoWeeksFromNow = addDays(new Date(), 14);

export const mockAppointments: Appointment[] = [
  {
    id: "apt1",
    title: "Property Inspection",
    description: "Regular quarterly inspection",
    propertyId: 1,
    propertyName: "Sunset Apartments",
    date: tomorrow.toISOString().split('T')[0],
    startTime: "10:00",
    endTime: "11:00",
    type: "inspection",
    status: "scheduled",
    attendees: ["John Smith", "Property Manager"]
  },
  {
    id: "apt2",
    title: "Plumbing Maintenance",
    description: "Fix leaking faucet in unit 302",
    propertyId: 2,
    propertyName: "Harbor Heights",
    date: nextWeek.toISOString().split('T')[0],
    startTime: "14:00",
    endTime: "15:30",
    type: "maintenance",
    status: "scheduled",
    notes: "Access code: 3021"
  },
  {
    id: "apt3",
    title: "Tenant Viewing",
    description: "Potential new tenant for Unit 201",
    propertyId: 3,
    propertyName: "Oak Residences",
    date: twoWeeksFromNow.toISOString().split('T')[0],
    startTime: "16:00",
    endTime: "16:30",
    type: "viewing",
    status: "scheduled",
    attendees: ["Sarah Johnson", "Leasing Agent"]
  },
  {
    id: "apt4",
    title: "Roof Inspection",
    description: "Annual roof inspection",
    propertyId: 1,
    propertyName: "Sunset Apartments",
    date: nextWeek.toISOString().split('T')[0],
    startTime: "09:00",
    endTime: "10:00",
    type: "inspection",
    status: "scheduled"
  },
  {
    id: "apt5",
    title: "HVAC Maintenance",
    description: "Quarterly HVAC system check",
    propertyId: 4,
    propertyName: "Riverfront Condos",
    date: tomorrow.toISOString().split('T')[0],
    startTime: "13:00",
    endTime: "15:00",
    type: "maintenance",
    status: "scheduled",
    notes: "Check all units, focus on buildings A and B"
  }
];
