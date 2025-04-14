
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServiceContactForm } from "@/components/service/ServiceContactForm";
import { Clipboard, CheckSquare, BarChart } from "lucide-react";

export default function InspectionRequest() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Property Inspection Request
            </h1>
            <p className="mt-3 mx-auto max-w-2xl text-xl text-gray-500">
              Comprehensive property condition assessment and detailed reporting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Full Property Inspection</h2>
                <p className="mb-4">
                  Our professional inspectors conduct thorough evaluations of distressed properties to identify all issues
                  and provide detailed reports with repair recommendations and cost estimates.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">What We Inspect:</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Structural integrity and foundation</li>
                  <li>Roof condition and remaining life</li>
                  <li>HVAC, electrical, and plumbing systems</li>
                  <li>Interior damage assessment</li>
                  <li>Water/moisture issues and mold detection</li>
                  <li>Safety hazards and code violations</li>
                  <li>Exterior conditions and landscaping</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3">Inspection Process:</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                      <Clipboard className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">On-Site Evaluation</h4>
                      <p className="text-gray-600">Our inspectors visit your property and conduct a comprehensive assessment.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                      <CheckSquare className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Detailed Report</h4>
                      <p className="text-gray-600">You receive a comprehensive report with photos documenting all issues found.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                      <BarChart className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Repair Recommendations</h4>
                      <p className="text-gray-600">We provide prioritized repair needs with estimated costs and timelines.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                <h3 className="text-lg font-semibold mb-2 text-green-800">Why request an inspection?</h3>
                <p className="mb-4 text-green-700">
                  Professional inspections help you make informed decisions about distressed properties, 
                  whether you're planning renovations, preparing for sale, or assessing investment potential.
                  Our reports provide the clarity needed to budget effectively and prioritize repairs.
                </p>
              </div>
            </div>
            
            <div>
              <ServiceContactForm serviceType="Property Inspection" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
