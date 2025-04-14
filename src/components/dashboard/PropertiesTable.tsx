
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Property {
  id: number;
  name: string;
  address: string;
  status: string;
  rent: number;
  tenants: number;
  maintenanceRequests?: number;
}

interface PropertiesTableProps {
  properties: Property[];
  onViewProperty?: (id: number) => void;
}

export function PropertiesTable({ properties, onViewProperty }: PropertiesTableProps) {
  const navigate = useNavigate();
  
  // Map status to color classes
  const statusColors = {
    Occupied: "bg-green-100 text-green-800",
    Vacant: "bg-red-100 text-red-800",
    Maintenance: "bg-yellow-100 text-yellow-800"
  };

  // Handle view property click
  const handleViewProperty = (id: number) => {
    if (onViewProperty) {
      onViewProperty(id);
    } else {
      navigate(`/properties/${id}`);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tenants</TableHead>
            <TableHead>Rent</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">
                <div>
                  <p className="font-medium">{property.name}</p>
                  <p className="text-xs text-gray-500">{property.address}</p>
                </div>
              </TableCell>
              <TableCell>
                <span 
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    statusColors[property.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {property.status}
                </span>
              </TableCell>
              <TableCell>{property.tenants}</TableCell>
              <TableCell>${property.rent.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewProperty(property.id)}
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
