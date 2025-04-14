
import React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Container className="flex-1 py-12 px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              TurnkeyFix Premium Management
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Simple pricing, no hidden fees or unexpected charges
            </p>
          </div>
          
          {/* Main pricing table */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border">
            <div className="px-6 py-8 bg-gray-50 border-b sm:px-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Premium Management</h2>
                <div className="bg-primary px-4 py-1 text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              </div>
            </div>
            
            <div className="px-6 py-8 sm:px-10">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-6">
                  <div className="font-medium text-gray-900">Monthly Fee</div>
                  <div className="text-xl font-bold text-gray-900">$65 / Unit</div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-6">
                  <div className="font-medium text-gray-900">Placement Fee</div>
                  <div className="text-xl font-bold text-gray-900">$325 <span className="text-sm font-medium text-gray-500">(One-Time)</span></div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-6">
                  <div className="font-medium text-gray-900">Maintenance Markup</div>
                  <div className="text-xl font-bold text-green-500">0%</div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-6">
                  <div className="font-medium text-gray-900">Major Rehab Price Markup</div>
                  <div className="text-xl font-bold text-green-500">0%</div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-6">
                  <div className="font-medium text-gray-900">After Hours & Holidays</div>
                  <div className="text-xl font-bold text-green-500">0%</div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-6">
                  <div className="font-medium text-gray-900">Initial Setup Fee</div>
                  <div className="text-xl font-bold text-green-500">$0</div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-6">
                  <div className="font-medium text-gray-900">Pricing Analysis Fee</div>
                  <div className="text-xl font-bold text-green-500">$0</div>
                </div>
                
                <div className="flex justify-between items-center pb-6">
                  <div className="font-medium text-gray-900">Contract Length</div>
                  <div className="text-xl font-bold text-gray-900">None</div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full py-6 text-lg">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Callout */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6 shadow-sm">
            <p className="text-lg font-medium text-amber-800">
              Most property managers charge 6–10% monthly + 1 month rent. TurnkeyFix is flat-fee, no markups.
            </p>
          </div>
          
          {/* Optional Services */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Optional Services (One-Time)
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Smart Lock Install
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold">
                      $149
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Full Property Inspection
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold">
                      $249
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Eviction Filing
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold">
                      $299
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      5-Bid Job Comparison
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold">
                      Free w/ Jobs {">"} $1000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Comparison Features */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Features Included in Premium Management
            </h2>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

// Features included list
const features = [
  "24/7 Maintenance Coordination",
  "Regular Property Inspections",
  "Tenant Screening & Placement",
  "Rent Collection & Processing",
  "Financial Reporting",
  "Lease Enforcement",
  "Eviction Coordination",
  "Property Marketing",
  "Move-in/Move-out Coordination",
  "Vendor Management",
  "Online Owner Portal",
  "Professional Photography",
  "Full AI + Live Support",
  "0% Maintenance Markup",
  "0% Rehab Markup",
];

export default Pricing;
