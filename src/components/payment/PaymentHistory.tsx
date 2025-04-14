
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Payment } from "@/types/property";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface PaymentHistoryProps {
  payments: Payment[];
}

export const PaymentHistory = ({ payments }: PaymentHistoryProps) => {
  // Map status to badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "succeeded":
        return <Badge variant="default" className="bg-green-500">Succeeded</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Receipt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No payment records found.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => {
              const paymentDate = new Date(payment.createdAt);
              const formattedDate = `${paymentDate.toLocaleDateString()} (${formatDistance(
                paymentDate,
                new Date(),
                { addSuffix: true }
              )})`;
              
              return (
                <TableRow key={payment.id}>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell className="font-medium">
                    ${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    {payment.receiptUrl ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => window.open(payment.receiptUrl, "_blank")}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        Receipt
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
