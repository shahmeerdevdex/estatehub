
import { format } from "date-fns";
import { MaintenanceRequest } from "@/types/maintenance";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { Separator } from "@/components/ui/separator";

interface MaintenanceRequestDetailsProps {
  request: MaintenanceRequest;
  onStatusChange: (requestId: string, newStatus: 'cancelled') => void;
}

export function MaintenanceRequestDetails({ request, onStatusChange }: MaintenanceRequestDetailsProps) {
  const formattedCreatedDate = format(new Date(request.createdAt), "PPP");
  const formattedUpdatedDate = format(new Date(request.updatedAt), "PPP");
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <CardTitle className="text-xl">{request.title}</CardTitle>
            <CardDescription>
              {request.propertyName} - {request.category}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={request.status} />
            <PriorityBadge priority={request.priority} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium">Description</h4>
          <p className="mt-1 text-gray-600">{request.description}</p>
        </div>
        
        {request.notes && request.notes.length > 0 && (
          <div>
            <h4 className="font-medium">Updates</h4>
            <ul className="mt-2 space-y-2">
              {request.notes.map((note, index) => (
                <li key={index} className="rounded-md bg-gray-50 p-3 text-sm">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Submitted:</span>
            <span className="ml-2">{formattedCreatedDate}</span>
          </div>
          <div>
            <span className="text-gray-500">Last Updated:</span>
            <span className="ml-2">{formattedUpdatedDate}</span>
          </div>
        </div>
      </CardContent>
      
      {request.status !== 'completed' && request.status !== 'cancelled' && (
        <>
          <Separator />
          <CardFooter className="justify-end pt-4">
            <Button 
              variant="outline" 
              onClick={() => onStatusChange(request.id, 'cancelled')}
            >
              Cancel Request
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
