
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface PropertyStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  colorClass?: string;
}

export function PropertyStatsCard({
  title,
  value,
  description,
  icon: Icon,
  colorClass = "text-blue-500 bg-blue-100"
}: PropertyStatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={cn("mr-4 flex h-12 w-12 items-center justify-center rounded-full", colorClass)}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="font-display text-2xl font-bold text-gray-900">{value}</p>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
