
import { Tenant } from "@/types/property";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, Phone } from "lucide-react";
import { format } from "date-fns";

interface TenantCardProps {
  tenant: Tenant;
}

export function TenantCard({ tenant }: TenantCardProps) {
  // Format the dates
  const formattedMoveInDate = format(new Date(tenant.moveInDate), "MMM d, yyyy");
  const formattedLeaseEnd = format(new Date(tenant.leaseEnd), "MMM d, yyyy");
  
  // Get tenant initials for avatar fallback
  const initials = tenant.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={tenant.profileImage} alt={tenant.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{tenant.name}</h3>
          <div className="flex items-center gap-2">
            <Badge variant={tenant.status === "active" ? "default" : "outline"}>
              {tenant.status === "active" ? "Active" : "Former"}
            </Badge>
            <span className="text-sm text-gray-500">
              ${tenant.rentAmount}/month
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <a href={`mailto:${tenant.email}`} className="text-blue-600 hover:underline">
            {tenant.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-500" />
          <a href={`tel:${tenant.phone}`} className="text-blue-600 hover:underline">
            {tenant.phone}
          </a>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">Move in: {formattedMoveInDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-600">Lease end: {formattedLeaseEnd}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
