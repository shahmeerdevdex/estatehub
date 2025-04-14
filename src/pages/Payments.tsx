
import React, { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { PaymentHistory } from "@/components/payment/PaymentHistory";
import { PaymentSuccess } from "@/components/payment/PaymentSuccess";
import { mockPayments } from "@/data/mockPaymentData";
import { properties } from "@/data/mockDashboardData";
import { mockTenants } from "@/data/mockTenantData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, CreditCard, Receipt, Clock } from "lucide-react";

const Payments = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTab, setCurrentTab] = useState("history");
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    paymentId: ""
  });
  
  // Extract just the id and name for select dropdowns
  const propertyOptions = properties.map(p => ({ id: p.id, name: p.name }));
  const tenantOptions = mockTenants.map(t => ({ id: t.id, name: t.name }));
  
  const handlePaymentSuccess = (paymentId: string) => {
    // This would typically use the amount from the form, but we're mocking it here
    setPaymentDetails({
      amount: "1,200.00",
      paymentId
    });
    setShowSuccess(true);
  };
  
  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <PaymentSuccess 
              amount={paymentDetails.amount} 
              paymentId={paymentDetails.paymentId} 
              receiptUrl="https://example.com/receipt-123"
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Payments</h1>
            <p className="text-muted-foreground">Manage payments and transactions for your properties</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="history" onClick={() => setCurrentTab("history")}>
                      <Receipt className="mr-2 h-4 w-4" />
                      Payment History
                    </TabsTrigger>
                    <TabsTrigger value="process" onClick={() => setCurrentTab("process")}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Process Payment
                    </TabsTrigger>
                  </TabsList>
                  
                  {currentTab === "history" && (
                    <Button onClick={() => setCurrentTab("process")}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Payment
                    </Button>
                  )}
                </div>
                
                <TabsContent value="history" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Payments</CardTitle>
                      <CardDescription>View and manage all payment transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PaymentHistory payments={mockPayments} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="process">
                  <PaymentForm 
                    properties={propertyOptions} 
                    tenants={tenantOptions} 
                    onPaymentSuccess={handlePaymentSuccess} 
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-3 flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Receipt className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Collected</p>
                      <p className="text-2xl font-bold">$6,350.00</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3 flex items-center space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pending</p>
                      <p className="text-2xl font-bold">$500.00</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <h3 className="font-medium mb-2">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => setCurrentTab("process")}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Process New Payment
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payment Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payments;
