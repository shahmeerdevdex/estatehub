
import { useState } from "react";
import { MaintenanceRequest, MaintenanceRequestStatus } from "@/types/maintenance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Check, FilterX, Search } from "lucide-react";

interface MaintenanceRequestListProps {
  requests: MaintenanceRequest[];
  onSelect: (requestId: string) => void;
  selectedRequestId: string | null;
}

export function MaintenanceRequestList({ 
  requests, 
  onSelect, 
  selectedRequestId 
}: MaintenanceRequestListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<MaintenanceRequestStatus | "all">("all");
  
  // Filter requests based on search and status filter
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };
  
  // Check if any filters are active
  const hasActiveFilters = searchTerm !== "" || statusFilter !== "all";
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search requests..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select 
          value={statusFilter} 
          onValueChange={(value) => setStatusFilter(value as MaintenanceRequestStatus | "all")}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} size="icon">
            <FilterX className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {filteredRequests.length === 0 ? (
        <div className="rounded-md border border-dashed p-8 text-center">
          <p className="text-gray-500">No maintenance requests found</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow 
                  key={request.id} 
                  className={request.id === selectedRequestId ? "bg-muted" : ""}
                >
                  <TableCell className="font-medium">{request.propertyName}</TableCell>
                  <TableCell>{request.title}</TableCell>
                  <TableCell><StatusBadge status={request.status} /></TableCell>
                  <TableCell><PriorityBadge priority={request.priority} /></TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {format(new Date(request.createdAt), "PP")}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onSelect(request.id)}
                      className={request.id === selectedRequestId ? "bg-primary text-primary-foreground" : ""}
                    >
                      {request.id === selectedRequestId && <Check className="mr-1 h-4 w-4" />}
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
