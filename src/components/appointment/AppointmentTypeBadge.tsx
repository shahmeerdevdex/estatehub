
import { cn } from "@/lib/utils";

interface AppointmentTypeBadgeProps {
  type: 'inspection' | 'maintenance' | 'viewing' | 'other';
  className?: string;
}

export function AppointmentTypeBadge({ type, className }: AppointmentTypeBadgeProps) {
  const badges = {
    inspection: "bg-blue-100 text-blue-800",
    maintenance: "bg-orange-100 text-orange-800",
    viewing: "bg-purple-100 text-purple-800",
    other: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badges[type],
        className
      )}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}
