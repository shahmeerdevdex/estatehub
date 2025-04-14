
import { useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { Search, Filter, MapPin, Home, Building, Tag, ChevronDown, ChevronUp, X, CheckCircle } from 'lucide-react';

export default function PropertyListing() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Sample properties data
  const properties = [
    {
      id: 1,
      title: 'Modern Apartment in Downtown',
      address: '123 Main St, San Francisco, CA 94105',
      price: 2950,
      beds: 2,
      baths: 2,
      sqft: 1200,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      status: 'active' as 'active' | 'pending' | 'inactive',
      featured: true,
    },
    {
      id: 2,
      title: 'Luxury Condo with City View',
      address: '456 Park Ave, New York, NY 10022',
      price: 4200,
      beds: 3,
      baths: 2,
      sqft: 1800,
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      status: 'active' as 'active' | 'pending' | 'inactive',
      featured: true,
    },
    {
      id: 3,
      title: 'Charming Townhouse',
      address: '789 Oak St, Austin, TX 78701',
      price: 2250,
      beds: 2,
      baths: 1.5,
      sqft: 1400,
      imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41cabfe98bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      status: 'active' as 'active' | 'pending' | 'inactive',
      featured: false,
    },
    {
      id: 4,
      title: 'Spacious Family Home',
      address: '321 Maple Dr, Chicago, IL 60611',
      price: 3500,
      beds: 4,
      baths: 3,
      sqft: 2400,
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      status: 'active' as 'active' | 'pending' | 'inactive',
      featured: false,
    },
    {
      id: 5,
      title: 'Urban Studio Apartment',
      address: '555 Market St, Seattle, WA 98101',
      price: 1800,
      beds: 1,
      baths: 1,
      sqft: 650,
      imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      status: 'active' as 'active' | 'pending' | 'inactive',
      featured: false,
    },
    {
      id: 6,
      title: 'Beachfront Condo',
      address: '888 Ocean Dr, Miami, FL 33139',
      price: 3800,
      beds: 2,
      baths: 2,
      sqft: 1350,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      status: 'active' as 'active' | 'pending' | 'inactive',
      featured: false,
    },
  ];
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="pt-16">
        {/* Page Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="font-display text-2xl font-bold text-gray-900 md:text-3xl">Properties</h1>
                <p className="mt-1 text-sm text-gray-600">Browse available properties</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Filters */}
            {filtersOpen && (
              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  {activeFilters.length > 0 && (
                    <button 
                      className="text-sm font-medium text-blue-500 hover:text-blue-600"
                      onClick={clearFilters}
                    >
                      Clear all
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Property Type</label>
                    <div className="mt-2 space-y-2">
                      {['Apartment', 'House', 'Condo', 'Townhouse'].map((type) => (
                        <div key={type} className="flex items-center">
                          <input 
                            id={`property-type-${type}`} 
                            type="checkbox" 
                            className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                            checked={activeFilters.includes(type)}
                            onChange={() => toggleFilter(type)}
                          />
                          <label htmlFor={`property-type-${type}`} className="ml-2 text-sm text-gray-600">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price Range</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="min-price" className="sr-only">Min Price</label>
                        <input
                          type="text"
                          id="min-price"
                          placeholder="Min"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="max-price" className="sr-only">Max Price</label>
                        <input
                          type="text"
                          id="max-price"
                          placeholder="Max"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                    <div className="mt-2 flex space-x-2">
                      {['Any', '1+', '2+', '3+', '4+'].map((bed) => (
                        <button
                          key={bed}
                          className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                            activeFilters.includes(`bed-${bed}`)
                              ? 'border-blue-500 bg-blue-50 text-blue-500'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => toggleFilter(`bed-${bed}`)}
                        >
                          {bed}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bathrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                    <div className="mt-2 flex space-x-2">
                      {['Any', '1+', '2+', '3+'].map((bath) => (
                        <button
                          key={bath}
                          className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                            activeFilters.includes(`bath-${bath}`)
                              ? 'border-blue-500 bg-blue-50 text-blue-500'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => toggleFilter(`bath-${bath}`)}
                        >
                          {bath}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Active Filters */}
                {activeFilters.length > 0 && (
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {activeFilters.map((filter) => (
                        <span 
                          key={filter}
                          className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {filter}
                          <button 
                            type="button" 
                            className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                            onClick={() => toggleFilter(filter)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Properties List */}
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing <span className="font-medium">{properties.length}</span> properties</p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                id="sort"
                className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              >
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center">
            <nav className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                    page === 1
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            </nav>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
