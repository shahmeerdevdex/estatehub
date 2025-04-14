
import { MapPin, Bed, Bath, Heart, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  id: string | number;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
  status?: 'active' | 'pending' | 'inactive';
  featured?: boolean;
}

export function PropertyCard({
  id,
  title,
  address,
  price,
  beds,
  baths,
  sqft,
  imageUrl,
  status = 'active',
  featured = false,
}: PropertyCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-gray-100 text-gray-800',
  };
  
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Property Image */}
      <Link to={`/properties/${id}`} className="relative block aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Status Tag */}
        {status && (
          <div className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-medium ${statusColors[status]}`}>
            {status === 'active' ? 'Available' : status === 'pending' ? 'Pending' : 'Inactive'}
          </div>
        )}
        
        {/* Featured Tag */}
        {featured && (
          <div className="absolute top-4 right-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
            Featured
          </div>
        )}
        
        {/* Favorite Button */}
        <button className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 backdrop-blur-sm transition-all hover:bg-white hover:text-red-500">
          <Heart className="h-4 w-4" />
        </button>
      </Link>
      
      {/* Property Info */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <Link to={`/properties/${id}`} className="block font-display text-lg font-semibold text-gray-800 hover:text-blue-500">
              {title}
            </Link>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              <span className="truncate">{address}</span>
            </div>
          </div>
          <p className="text-right font-display text-lg font-bold text-blue-500">
            ${price.toLocaleString()}<span className="text-sm font-medium text-gray-500">/mo</span>
          </p>
        </div>
        
        {/* Property Features */}
        <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Bed className="mr-1 h-4 w-4" />
            <span>{beds} Bed{beds !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Bath className="mr-1 h-4 w-4" />
            <span>{baths} Bath{baths !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Square className="mr-1 h-4 w-4" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
}
