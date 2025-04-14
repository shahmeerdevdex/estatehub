
import { Payment } from "@/types/property";

export const mockPayments: Payment[] = [
  {
    id: "pi_3N7aZoF7JDkl82Kl0",
    amount: 1850,
    currency: "usd",
    status: "succeeded",
    createdAt: "2023-06-15T10:00:00Z",
    propertyId: 1,
    tenantId: 1,
    description: "Rent payment for June 2023",
    paymentMethod: "visa",
    receiptUrl: "https://example.com/receipt-123"
  },
  {
    id: "pi_4K9bYpG8KElm93Lm1",
    amount: 2300,
    currency: "usd",
    status: "succeeded",
    createdAt: "2023-06-01T14:30:00Z",
    propertyId: 4,
    tenantId: 2,
    description: "Rent payment for June 2023",
    paymentMethod: "mastercard",
    receiptUrl: "https://example.com/receipt-456"
  },
  {
    id: "pi_5L1cZqH9LFmn04Mn2",
    amount: 1700,
    currency: "usd",
    status: "failed",
    createdAt: "2023-05-31T09:15:00Z",
    propertyId: 3,
    tenantId: 4,
    description: "Rent payment for June 2023",
    paymentMethod: "amex"
  },
  {
    id: "pi_6M2dArI0MGno15No3",
    amount: 250,
    currency: "usd",
    status: "succeeded",
    createdAt: "2023-05-20T16:45:00Z",
    propertyId: 2,
    tenantId: 3,
    description: "Late fee payment",
    paymentMethod: "visa",
    receiptUrl: "https://example.com/receipt-789"
  },
  {
    id: "pi_7N3eBsJ1NHop26Op4",
    amount: 500,
    currency: "usd",
    status: "pending",
    createdAt: "2023-06-18T08:20:00Z",
    propertyId: 1,
    tenantId: 1,
    description: "Security deposit partial payment",
    paymentMethod: "discover"
  }
];

export const getPropertyPayments = (propertyId: number): Payment[] => {
  return mockPayments.filter(payment => payment.propertyId === propertyId);
};

export const getTenantPayments = (tenantId: number): Payment[] => {
  return mockPayments.filter(payment => payment.tenantId === tenantId);
};
