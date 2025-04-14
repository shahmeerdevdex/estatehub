
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServiceContactForm } from "@/components/service/ServiceContactForm";
import { FileText, AlertTriangle, CheckCircle } from "lucide-react";

export default function FinesViolationsCheck() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Fines & Violations Check
            </h1>
            <p className="mt-3 mx-auto max-w-2xl text-xl text-gray-500">
              Comprehensive review of open city violations and property fines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Violation & Fine Assessment</h2>
                <p className="mb-4">
                  Our team conducts thorough investigations of all open city violations, fines, and liens against your property.
                  We provide a detailed report and actionable recommendations for resolution.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">What We Check:</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Building code violations</li>
                  <li>Health department citations</li>
                  <li>Property maintenance issues</li>
                  <li>Outstanding municipal fines</li>
                  <li>Tax liens and special assessments</li>
                  <li>Utility liens and disconnections</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3">Our Process:</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Records Search</h4>
                      <p className="text-gray-600">We search municipal databases and public records for all violations.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Assessment Report</h4>
                      <p className="text-gray-600">You receive a comprehensive report detailing all findings and financial impact.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                      <CheckCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Resolution Plan</h4>
                      <p className="text-gray-600">We provide a step-by-step plan to address and resolve all issues.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                <h3 className="text-lg font-semibold mb-2 text-orange-800">Why this matters</h3>
                <p className="mb-4 text-orange-700">
                  Unaddressed violations can lead to compounding fines, property seizure, or inability to sell or rent the property. 
                  Our service helps you address these issues before they escalate into larger problems.
                </p>
              </div>
            </div>
            
            <div>
              <ServiceContactForm serviceType="Fines & Violations Check" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
