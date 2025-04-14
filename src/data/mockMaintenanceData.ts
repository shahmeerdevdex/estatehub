
import { MaintenanceRequest } from "@/types/maintenance";

export const maintenanceCategories = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Appliance",
  "Structural",
  "Pest Control",
  "Landscaping",
  "Other"
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "m1",
    propertyId: "1",
    propertyName: "Sunset Apartments #101",
    title: "Leaking kitchen faucet",
    description: "The kitchen faucet has been leaking for two days. Water is pooling under the sink.",
    category: "Plumbing",
    priority: "medium",
    status: "in-progress",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-16T14:20:00Z",
    notes: ["Plumber scheduled for Friday"]
  },
  {
    id: "m2",
    propertyId: "2",
    propertyName: "Oakwood Townhouse",
    title: "AC not cooling",
    description: "The air conditioner is running but not cooling the house. Current temperature is 82°F inside.",
    category: "HVAC",
    priority: "high",
    status: "pending",
    createdAt: "2023-06-18T08:15:00Z",
    updatedAt: "2023-06-18T08:15:00Z"
  },
  {
    id: "m3",
    propertyId: "3",
    propertyName: "Pine Street Duplex",
    title: "Broken dishwasher",
    description: "Dishwasher is making loud grinding noises and not cleaning dishes properly.",
    category: "Appliance",
    priority: "low",
    status: "completed",
    createdAt: "2023-06-10T16:45:00Z",
    updatedAt: "2023-06-12T11:30:00Z",
    notes: ["Replaced dishwasher motor", "Tested and working properly"]
  },
  {
    id: "m4",
    propertyId: "4",
    propertyName: "Lakeside Condos #304",
    title: "Electrical outlet sparking",
    description: "The outlet in the master bedroom is sparking when plugging in devices. Have disconnected everything from it for safety.",
    category: "Electrical",
    priority: "emergency",
    status: "completed",
    createdAt: "2023-06-17T20:10:00Z",
    updatedAt: "2023-06-18T09:45:00Z",
    notes: ["Electrician emergency visit completed", "Faulty outlet replaced"]
  },
  {
    id: "m5",
    propertyId: "1",
    propertyName: "Sunset Apartments #101",
    title: "Bathroom ceiling water stain",
    description: "There's a growing water stain on the bathroom ceiling, possibly from the unit above.",
    category: "Plumbing",
    priority: "medium",
    status: "pending",
    createdAt: "2023-06-19T13:25:00Z",
    updatedAt: "2023-06-19T13:25:00Z"
  }
];
