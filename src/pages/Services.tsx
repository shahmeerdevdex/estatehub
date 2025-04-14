
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleCheckout = () => {
    if (!selectedService) {
      toast({
        title: "No service selected",
        description: "Please select a service to continue",
        variant: "destructive",
      });
      return;
    }

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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Property Management Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose from our range of professional property management services tailored for owners and brokers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((service) => (
          <Card 
            key={service.id}
            className={cn(
              "flex flex-col h-full transition-all duration-200 hover:shadow-lg",
              selectedService === service.id ? "ring-2 ring-primary" : "",
              service.popular ? "border-primary" : ""
            )}
          >
            {service.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {service.icon}
                </div>
                <CardTitle>{service.name}</CardTitle>
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <span className="text-3xl font-bold">${service.price}</span>
                <span className="text-muted-foreground"> one-time fee</span>
              </div>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button 
                onClick={() => handleSelectService(service.id)} 
                variant={selectedService === service.id ? "default" : "outline"}
                className="w-full"
              >
                {selectedService === service.id ? "Selected" : "Select"}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                asChild
              >
                <Link to={`/services/${service.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          size="lg" 
          onClick={handleCheckout}
          disabled={!selectedService}
          className="px-8"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Services;
