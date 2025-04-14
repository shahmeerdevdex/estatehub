
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServiceContactForm } from "@/components/service/ServiceContactForm";
import { Home, Wrench, DollarSign } from "lucide-react";

export default function MarketReadinessEstimate() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Market Readiness Estimate
            </h1>
            <p className="mt-3 mx-auto max-w-2xl text-xl text-gray-500">
              Get a detailed estimate of the costs and timeline to make your property market-ready.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Rent-Ready Repair Estimate</h2>
                <p className="mb-4">
                  Our comprehensive assessment provides property owners with a detailed plan to transform vacant 
                  or distressed properties into market-ready rentals, including cost estimates and timelines.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">What You Receive:</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Itemized repair and renovation costs</li>
                  <li>Timeline projections for repairs and renovations</li>
                  <li>Rental market analysis for your property</li>
                  <li>Projected ROI based on improvement costs vs. rental income</li>
                  <li>Recommendations for high-impact, cost-effective improvements</li>
                  <li>Contractor referrals and management options</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3">Our Process:</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                      <Home className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Property Assessment</h4>
                      <p className="text-gray-600">We evaluate your property's current condition and identify all needed repairs.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                      <Wrench className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Improvement Planning</h4>
                      <p className="text-gray-600">Our team develops a strategic renovation plan with cost and time estimates.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Market Analysis</h4>
                      <p className="text-gray-600">We analyze the local rental market to project potential rental income.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                <h3 className="text-lg font-semibold mb-2 text-purple-800">Turn vacant properties into income-generating assets</h3>
                <p className="mb-4 text-purple-700">
                  Whether you're an individual owner with a vacant property or an asset manager with multiple 
                  distressed properties, our market readiness estimates help you make informed decisions about 
                  your investment and maximize your return.
                </p>
              </div>
            </div>
            
            <div>
              <ServiceContactForm serviceType="Market Readiness Estimate" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
