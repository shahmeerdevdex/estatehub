
import { Badge } from "@/components/ui/badge";
import { MaintenanceRequestStatus } from "@/types/maintenance";

interface StatusBadgeProps {
  status: MaintenanceRequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let variant: "default" | "secondary" | "outline" | "destructive" = "default";
  
  switch (status) {
    case "pending":
      variant = "outline";
      break;
    case "in-progress":
      variant = "secondary";
      break;
    case "completed":
      variant = "default";
      break;
    case "cancelled":
      variant = "destructive";
      break;
  }
  
  return (
    <Badge variant={variant}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </Badge>
  );
}
