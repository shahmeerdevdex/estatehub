
import { Tenant } from "@/types/property";

export const mockTenants: Tenant[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    moveInDate: "2023-01-15",
    leaseEnd: "2024-01-15",
    rentAmount: 1850,
    status: "active",
    propertyId: 1,
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 321-7654",
    moveInDate: "2023-03-01",
    leaseEnd: "2024-03-01",
    rentAmount: 2300,
    status: "active",
    propertyId: 4,
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    phone: "(555) 987-6543",
    moveInDate: "2022-08-15",
    leaseEnd: "2023-08-15",
    status: "former",
    rentAmount: 2100,
    propertyId: 2,
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "(555) 456-7890",
    moveInDate: "2022-11-01",
    leaseEnd: "2023-11-01",
    status: "former",
    rentAmount: 1700,
    propertyId: 3,
    profileImage: "https://randomuser.me/api/portraits/women/28.jpg"
  }
];
