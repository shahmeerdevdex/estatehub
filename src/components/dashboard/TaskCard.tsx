
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  title: string;
  dueDate: string;
  type: string;
  typeColor?: string;
  onView?: () => void;
}

export function TaskCard({
  title,
  dueDate,
  type,
  typeColor,
  onView
}: TaskCardProps) {
  const typeColors = {
    Inspection: "bg-blue-100 text-blue-800",
    Payment: "bg-green-100 text-green-800",
    Maintenance: "bg-orange-100 text-orange-800",
    Lease: "bg-purple-100 text-purple-800"
  };

  const color = typeColor || typeColors[type as keyof typeof typeColors] || "bg-gray-100 text-gray-800";

  return (
    <div className="px-6 py-4 border-b border-gray-200 last:border-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className={cn("inline-flex rounded-full px-2 py-1 text-xs font-semibold", color)}>
              {type}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="text-xs text-gray-500">Due: {dueDate}</p>
          </div>
        </div>
        <div className="text-right">
          <button 
            onClick={onView}
            className="rounded-md px-2 py-1 text-xs font-medium text-blue-500 hover:bg-blue-50"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
