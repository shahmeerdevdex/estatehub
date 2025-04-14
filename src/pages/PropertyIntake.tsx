
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PropertyIntakeForm } from "@/components/property-intake/PropertyIntakeForm";

export default function PropertyIntake() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Property Intake
            </h1>
            <p className="mt-3 mx-auto max-w-2xl text-xl text-gray-500">
              Let us help you manage your distressed property. Complete the form below to get started.
            </p>
          </div>
          
          <PropertyIntakeForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
