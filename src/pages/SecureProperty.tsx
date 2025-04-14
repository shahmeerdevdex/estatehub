
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ServiceContactForm } from "@/components/service/ServiceContactForm";
import { Lock, Key, ShieldCheck } from "lucide-react";

export default function SecureProperty() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Secure Your Property
            </h1>
            <p className="mt-3 mx-auto max-w-2xl text-xl text-gray-500">
              Smart lock installation and property access management solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Smart Lock Installation</h2>
                <p className="mb-4">
                  Our smart lock installation service provides keyless entry solutions for your distressed or vacant properties. 
                  We handle everything from hardware installation to setting up user access systems.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Benefits:</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Keyless entry for property managers and contractors</li>
                  <li>Secure access logs to track all property entries</li>
                  <li>Remote lock/unlock capabilities</li>
                  <li>Temporary access codes for maintenance workers</li>
                  <li>Integration with property management software</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-3">How It Works:</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                      <Key className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Installation</h4>
                      <p className="text-gray-600">Our technicians install commercial-grade smart locks on your property.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                      <ShieldCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Setup & Configuration</h4>
                      <p className="text-gray-600">We configure user access and connect locks to our management platform.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                      <Lock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium">Ongoing Management</h4>
                      <p className="text-gray-600">Access our platform to manage entry permissions and monitor access logs.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h3 className="text-lg font-semibold mb-2 text-blue-800">Ready to secure your property?</h3>
                <p className="mb-4 text-blue-700">
                  Complete the form to request a smart lock installation. Our team will contact you 
                  within 24 hours to discuss your needs and schedule the installation.
                </p>
              </div>
            </div>
            
            <div>
              <ServiceContactForm serviceType="Smart Lock Installation" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
