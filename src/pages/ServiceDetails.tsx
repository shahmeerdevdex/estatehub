
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowLeft } from "lucide-react";
import { getServiceById } from "@/data/services";
import { useToast } from "@/hooks/use-toast";

const ServiceDetails = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const service = serviceId ? getServiceById(serviceId) : undefined;

  if (!service) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The service you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/services")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>
      </div>
    );
  }

  const handlePurchase = () => {
    toast({
      title: "Proceeding to checkout",
      description: "This would connect to Stripe or PayPal in production",
    });
    
    setTimeout(() => {
      navigate("/");
      toast({
        title: "Purchase successful!",
        description: "Your service has been scheduled. Check your email for details.",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <Button 
        variant="ghost" 
        className="mb-8"
        onClick={() => navigate("/services")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Services
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold tracking-tight mb-6">{service.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              {service.icon}
            </div>
            <span className="text-xl font-semibold">${service.price}</span>
            <span className="text-muted-foreground">one-time fee</span>
            {service.popular && (
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full ml-2">
                Popular
              </span>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Overview</h2>
            <p className="text-lg mb-6">{service.fullDescription}</p>
            
            <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Purchase {service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-3xl font-bold mb-1">${service.price}</div>
                <p className="text-muted-foreground">One-time payment</p>
              </div>
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-sm text-muted-foreground">
                    +{service.features.length - 3} more features
                  </li>
                )}
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePurchase} className="w-full">
                Purchase Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
