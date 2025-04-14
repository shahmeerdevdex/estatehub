
import { User, Settings, Receipt, MessageSquare, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  type: "application" | "maintenance" | "payment" | "message" | string;
}

export function ActivityItem({ title, description, time, type }: ActivityItemProps) {
  // Map activity types to icons and colors
  const activityConfig = {
    application: { icon: User, color: "bg-blue-100 text-blue-500" },
    maintenance: { icon: Settings, color: "bg-green-100 text-green-500" },
    payment: { icon: Receipt, color: "bg-purple-100 text-purple-500" },
    message: { icon: MessageSquare, color: "bg-yellow-100 text-yellow-500" },
    default: { icon: Home, color: "bg-gray-100 text-gray-500" }
  };

  const config = activityConfig[type as keyof typeof activityConfig] || activityConfig.default;
  const Icon = config.icon;

  return (
    <div className="px-6 py-4 border-b border-gray-200 last:border-0">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", config.color)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
          <p className="mt-1 text-xs text-gray-400">{time}</p>
        </div>
      </div>
    </div>
  );
}
