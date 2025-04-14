
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PaymentSuccessProps {
  amount: string;
  paymentId: string;
  receiptUrl?: string;
}

export const PaymentSuccess = ({ amount, paymentId, receiptUrl }: PaymentSuccessProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Payment Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-green-50 text-green-800">
          <p className="text-sm font-medium">Amount Paid</p>
          <p className="text-2xl font-bold">${amount}</p>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Payment ID: {paymentId}</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        
        {receiptUrl && (
          <Button variant="outline" className="w-full" onClick={() => window.open(receiptUrl, "_blank")}>
            View Receipt
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
        <Button onClick={() => navigate("/payments")}>
          View All Payments
        </Button>
      </CardFooter>
    </Card>
  );
};
