
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white pb-16 pt-32 md:pb-24 md:pt-40">
      {/* Background Decoration */}
      <div className="absolute -right-64 -top-64 h-[500px] w-[500px] rounded-full bg-blue-500/5"></div>
      <div className="absolute -left-64 top-1/2 h-[400px] w-[400px] rounded-full bg-blue-500/5"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Turn Vacant or Underperforming Properties Into Cash-Flowing Rentals
          </h1>
          
          <p className="mt-6 animate-slide-up text-lg text-gray-600 md:text-xl">
            TurnkeyFix eliminates fines, clears violations, and gets your rentals income-ready with full transparency and AI-powered automation.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/start-property-intake"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg sm:w-auto"
            >
              <span>Start Property Intake</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link
              to="/pricing"
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md sm:w-auto"
            >
              <span>View Pricing</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Feature Badges */}
        <div className="mx-auto mt-16 max-w-5xl animate-slide-up">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: 'Smart Lock Installation', value: 'Secure Access' },
              { label: 'Violation Checks', value: 'Prevent Fines' },
              { label: 'Repair Coordination', value: 'Market Ready' },
              { label: 'Eviction Support', value: 'Fully Managed' },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <p className="text-xs font-medium uppercase text-gray-500">{feature.label}</p>
                <p className="mt-1 text-base font-semibold text-gray-900">{feature.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
