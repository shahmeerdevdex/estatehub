
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  tier: string;
  price: string;
  placementFee: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export function PricingCard({
  tier,
  price,
  placementFee,
  features,
  popular = false,
  ctaText = "Get Started",
  ctaLink = "/start-property-intake"
}: PricingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border">
      <div className="px-6 py-8 bg-gray-50 border-b sm:px-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{tier}</h2>
          {popular && (
            <div className="bg-primary px-4 py-1 text-white text-sm font-medium rounded-full">
              Most Popular
            </div>
          )}
        </div>
      </div>
      
      <div className="px-6 py-8 sm:px-10">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-6">
            <div className="font-medium text-gray-900">Monthly Fee</div>
            <div className="text-xl font-bold text-gray-900">{price}</div>
          </div>
          
          <div className="flex justify-between items-center border-b pb-6">
            <div className="font-medium text-gray-900">Placement Fee</div>
            <div className="text-xl font-bold text-gray-900">{placementFee} <span className="text-sm font-medium text-gray-500">(One-Time)</span></div>
          </div>
          
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-base text-gray-700">{feature}</p>
            </div>
          ))}
          
          <div className="pt-4">
            <Button className="w-full py-6 text-lg" asChild>
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
