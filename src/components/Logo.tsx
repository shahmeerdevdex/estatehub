
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'small';
}

export function Logo({ variant = 'default' }: LogoProps) {
  return (
    <Link 
      to="/" 
      className={`inline-flex items-center gap-2 text-blue-500 transition-all duration-300 hover:text-blue-600 ${
        variant === 'small' ? 'text-lg font-medium' : 'text-2xl font-semibold'
      }`}
    >
      <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-blue-500 shadow-md transition-all duration-300 hover:bg-blue-600">
        <Home className="h-4 w-4 text-white" />
      </div>
      <span className="animate-fade-in">EstateHub</span>
    </Link>
  );
}
