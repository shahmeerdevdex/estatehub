
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";

interface Payment {
  id: number;
  property: string;
  tenant: string;
  amount: number;
  date: string;
  status: string;
  method: string;
}

interface PaymentsTableProps {
  payments: Payment[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  // Map status to color classes
  const statusColors = {
    Paid: "bg-green-100 text-green-800",
    Due: "bg-yellow-100 text-yellow-800",
    Overdue: "bg-red-100 text-red-800",
    Pending: "bg-blue-100 text-blue-800"
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => {
            const paymentDate = new Date(payment.date);
            const formattedDate = `${paymentDate.toLocaleDateString()} (${formatDistance(
              paymentDate,
              new Date(),
              { addSuffix: true }
            )})`;

            return (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.property}</TableCell>
                <TableCell>{payment.tenant}</TableCell>
                <TableCell>${payment.amount.toLocaleString()}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <span 
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      statusColors[payment.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </TableCell>
                <TableCell>{payment.method}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
}
