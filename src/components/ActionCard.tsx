
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  variant?: 'default' | 'primary' | 'outlined';
  className?: string;
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  to,
  variant = 'default',
  className,
}: ActionCardProps) {
  const variantClasses = {
    default: 'bg-white border border-gray-200 hover:border-gray-300 text-gray-800',
    primary: 'bg-blue-500 border border-blue-500 hover:bg-blue-600 text-white',
    outlined: 'bg-white border border-blue-200 hover:border-blue-300 text-blue-500',
  };

  return (
    <Link
      to={to}
      className={cn(
        'group flex flex-col rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md',
        variantClasses[variant],
        className
      )}
    >
      <div
        className={cn(
          'mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300',
          variant === 'primary'
            ? 'bg-blue-400/30 text-white group-hover:bg-blue-400/40'
            : variant === 'outlined'
            ? 'bg-blue-50 text-blue-500 group-hover:bg-blue-100'
            : 'bg-gray-100 text-blue-500 group-hover:bg-gray-200'
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3
        className={cn(
          'font-display text-lg font-semibold',
          variant === 'primary' ? 'text-white' : 'text-gray-800'
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          'mt-2 text-sm',
          variant === 'primary' ? 'text-blue-50' : 'text-gray-500'
        )}
      >
        {description}
      </p>

      <div
        className={cn(
          'mt-4 flex items-center text-sm font-medium',
          variant === 'primary' ? 'text-blue-50' : 'text-blue-500'
        )}
      >
        <span>Learn more</span>
        <svg
          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
