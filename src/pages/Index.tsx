
import { Link } from 'react-router-dom';
import { Settings, Clock, Receipt, FileText, User, Building, ChevronRight, ArrowRight } from 'lucide-react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ActionCard } from '@/components/ActionCard';
import { FeatureCard } from '@/components/FeatureCard';

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Key Feature Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Property Management Made Simple
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to transform vacant or underperforming properties
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="All-in-One Property Rehab & Management"
              description="We handle everything from violations, taxes, smart lock installs, and full leasing support — for just $65/unit."
            />
            
            <FeatureCard
              title="Transparent, Flat Pricing"
              description="No percentage-based fees, no markups — just straightforward pricing that beats competitors by 25%+."
            />
            
            <FeatureCard
              title="AI Automation + Real People"
              description="Automated support + live experts to handle contractors, tenants, and owner questions in real-time."
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Built for Property Owners, Brokers, and Asset Managers
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A comprehensive suite of tools to streamline property management, from repairs to rent collection.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ActionCard
              title="Full-Service Maintenance"
              description="Repairs, rehabs, and turnovers handled by our in-house maintenance crew."
              icon={Settings}
              to="/maintenance"
              variant="default"
            />
            <ActionCard
              title="24/7 Owner Support"
              description="Our team is available around the clock to assist with any issue, big or small."
              icon={Clock}
              to="/support"
              variant="primary"
            />
            <ActionCard
              title="Rent Collection"
              description="Secure, automated rent payments, late fee tracking, and financial reporting."
              icon={Receipt}
              to="/rent-collection"
              variant="default"
            />
            <ActionCard
              title="Eviction Support"
              description="We handle the legal and logistical side of removing bad tenants."
              icon={FileText}
              to="/eviction-support"
              variant="default"
            />
            <ActionCard
              title="Broker-Friendly Tools"
              description="Designed for real estate pros managing multiple units or investor portfolios."
              icon={User}
              to="/broker-tools"
              variant="outlined"
            />
            <ActionCard
              title="Institutional Grade Services"
              description="We bring large-scale repair experience to small and mid-sized owners."
              icon={Building}
              to="/institutional"
              variant="default"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-blue-500 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Join Property Owners Getting Units Rehabbed & Rented
                </h2>
                <p className="mt-4 text-lg text-blue-100">
                  Whether you own one home or manage a portfolio, we'll handle repairs, leasing, and everything after.
                </p>
                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-blue-500 shadow-md transition-all duration-300 hover:bg-blue-50"
                  >
                    <span>Get in Touch With Our Team</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              <div className="hidden bg-blue-600 lg:block">
                <div className="h-full bg-[url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center opacity-25"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trusted Partners Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Trusted by Banks & Insurers</h2>
            <p className="mt-4 text-lg text-gray-600">
              Major financial institutions rely on our services to maintain and maximize property values.
            </p>
          </div>
          
          <div className="mt-16 flex flex-wrap items-center justify-center gap-12">
            {/* Placeholder for partner logos */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex h-16 w-40 items-center justify-center rounded-lg bg-white p-4 shadow-sm">
                <div className="h-6 w-32 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
