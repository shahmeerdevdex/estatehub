
// Properties mock data
export const properties = [
  {
    id: 1,
    name: "123 Main St",
    address: "123 Main St, San Francisco, CA 94110",
    status: "Occupied",
    rent: 1850,
    tenants: 2,
    lastPayment: "2023-09-01",
    nextPayment: "2023-10-01",
    maintenanceRequests: 1,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "456 Oak Ave",
    address: "456 Oak Ave, San Francisco, CA 94117",
    status: "Vacant",
    rent: 2100,
    tenants: 0,
    lastPayment: "2023-08-01",
    nextPayment: "2023-10-01",
    maintenanceRequests: 2,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "789 Pine Dr",
    address: "789 Pine Dr, Oakland, CA 94611",
    status: "Maintenance",
    rent: 1700,
    tenants: 0,
    lastPayment: "2023-08-01",
    nextPayment: "",
    maintenanceRequests: 3,
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "321 Cedar Ln",
    address: "321 Cedar Ln, Berkeley, CA 94704",
    status: "Occupied",
    rent: 2300,
    tenants: 3,
    lastPayment: "2023-09-01",
    nextPayment: "2023-10-01",
    maintenanceRequests: 0,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
];

// Recent activities
export const activities = [
  {
    id: 1,
    title: "New tenant application",
    description: "John Doe applied for 123 Main St",
    time: "2 hours ago",
    type: "application"
  },
  {
    id: 2,
    title: "Maintenance request resolved",
    description: "Plumbing issue at 456 Oak Ave has been fixed",
    time: "5 hours ago",
    type: "maintenance"
  },
  {
    id: 3,
    title: "Rent payment received",
    description: "Sarah Johnson paid $1,850 for September rent",
    time: "1 day ago",
    type: "payment"
  },
  {
    id: 4,
    title: "New message from tenant",
    description: "Michael Brown sent a message about parking",
    time: "2 days ago",
    type: "message"
  }
];

// Upcoming tasks
export const tasks = [
  {
    id: 1,
    title: "Property inspection",
    description: "Annual inspection for 123 Main St",
    dueDate: "Today",
    type: "Inspection",
    property: "123 Main St",
    priority: "High"
  },
  {
    id: 2,
    title: "Rent collection",
    description: "Process rent payments for all properties",
    dueDate: "Tomorrow",
    type: "Payment",
    property: "All properties",
    priority: "High"
  },
  {
    id: 3,
    title: "Maintenance request",
    description: "Fix broken dishwasher at 789 Pine Dr",
    dueDate: "Sep 28",
    type: "Maintenance",
    property: "789 Pine Dr",
    priority: "Medium"
  },
  {
    id: 4,
    title: "Lease renewal",
    description: "Prepare lease renewal for 321 Cedar Ln",
    dueDate: "Oct 5",
    type: "Lease",
    property: "321 Cedar Ln",
    priority: "Medium"
  }
];

// Payment history data
export const payments = [
  {
    id: 1,
    property: "123 Main St",
    tenant: "John Smith",
    amount: 1850,
    date: "2023-09-01",
    status: "Paid",
    method: "Bank Transfer"
  },
  {
    id: 2,
    property: "321 Cedar Ln",
    tenant: "Sarah Johnson",
    amount: 2300,
    date: "2023-09-01",
    status: "Paid",
    method: "Credit Card"
  },
  {
    id: 3,
    property: "123 Main St",
    tenant: "John Smith",
    amount: 1850,
    date: "2023-08-01",
    status: "Paid",
    method: "Bank Transfer"
  },
  {
    id: 4,
    property: "456 Oak Ave",
    tenant: "Michael Brown",
    amount: 2100,
    date: "2023-08-01",
    status: "Paid",
    method: "Bank Transfer"
  },
  {
    id: 5,
    property: "789 Pine Dr",
    tenant: "Emma Wilson",
    amount: 1700,
    date: "2023-08-01",
    status: "Paid",
    method: "Credit Card"
  }
];
