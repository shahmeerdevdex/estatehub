
import { Badge } from "@/components/ui/badge";
import { MaintenanceRequestPriority } from "@/types/maintenance";

interface PriorityBadgeProps {
  priority: MaintenanceRequestPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const classNames = {
    low: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    high: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    emergency: "bg-red-100 text-red-800 hover:bg-red-100"
  };
  
  return (
    <Badge className={classNames[priority]} variant="outline">
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}
