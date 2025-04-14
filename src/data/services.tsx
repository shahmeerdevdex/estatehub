
import { Shield, CalendarClock, DollarSign, Scale, Building } from "lucide-react";
import React from "react";

export interface ServicePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  fullDescription?: string;
}

// Create icon components as functions to avoid direct JSX in the object literals
const createShieldIcon = () => <Shield className="h-6 w-6" />;
const createCalendarIcon = () => <CalendarClock className="h-6 w-6" />;
const createScaleIcon = () => <Scale className="h-6 w-6" />;
const createDollarIcon = () => <DollarSign className="h-6 w-6" />;
const createBuildingIcon = () => <Building className="h-6 w-6" />;

export const services: ServicePlan[] = [
  {
    id: "maintenance-visit",
    name: "Maintenance Visit",
    description: "Basic repair dispatch and maintenance service",
    price: 99,
    icon: createShieldIcon(),
    features: [
      "Professional repair assessment",
      "Coordination with vendors",
      "Follow-up inspection",
      "Detailed reporting",
      "30-day service guarantee"
    ],
    fullDescription: "Our Maintenance Visit service provides professional property repair assessment and vendor coordination. When maintenance issues arise, our team will dispatch qualified professionals to your property, coordinate all repair work with trusted vendors, conduct follow-up inspections to ensure quality, and provide detailed reporting on all work completed. All maintenance visits come with our 30-day service guarantee for your peace of mind."
  },
  {
    id: "turnover-package",
    name: "Full Turnover Package",
    description: "Complete turnover service for vacated properties",
    price: 499,
    icon: createCalendarIcon(),
    popular: true,
    features: [
      "Deep cleaning service",
      "Fresh paint (up to 3 rooms)",
      "Minor repairs included",
      "Rental readiness inspection",
      "Marketing photos for listing",
      "60-day service guarantee"
    ],
    fullDescription: "The Full Turnover Package is our comprehensive solution for properties between tenants. This all-inclusive service prepares your property for the next tenant quickly and professionally. We provide thorough deep cleaning of all areas, fresh paint for up to three rooms, address all minor repairs, conduct a detailed rental readiness inspection, and take professional marketing photos for your new listing. Our turnover package comes with a 60-day service guarantee, ensuring your property is market-ready and appealing to quality tenants."
  },
  {
    id: "eviction-filing",
    name: "Eviction Filing",
    description: "Legal preparation and filing support",
    price: 299,
    icon: createScaleIcon(),
    features: [
      "Document preparation",
      "Court filing assistance",
      "Process service coordination",
      "Hearing representation options",
      "Follow-up documentation"
    ],
    fullDescription: "Our Eviction Filing service helps property owners navigate the complex legal process of tenant eviction. We handle the preparation of all necessary legal documents, assist with court filing procedures, coordinate process service to ensure proper legal notification, offer options for representation at eviction hearings, and provide thorough follow-up documentation for your records. Our experienced team ensures compliance with all local regulations while protecting your interests throughout the eviction process."
  },
  {
    id: "rent-collection",
    name: "Rent Collection Service",
    description: "Monthly rent collection and payment processing",
    price: 199,
    icon: createDollarIcon(),
    features: [
      "Automatic payment reminders",
      "Payment processing",
      "Direct deposit to your account",
      "Late fee automation",
      "Monthly financial reporting"
    ],
    fullDescription: "Our Rent Collection Service streamlines your rental income management with automated systems for consistent and reliable payments. We send automatic payment reminders to tenants, process all incoming payments through secure channels, set up direct deposits to your designated account, automate late fee assessment when necessary, and provide detailed monthly financial reporting. This service helps maximize your cash flow while minimizing the time and effort required to manage rent collection."
  },
  {
    id: "broker-package",
    name: "Broker Tools Package",
    description: "Comprehensive tools for property brokers",
    price: 399,
    icon: createBuildingIcon(),
    features: [
      "Property valuation tools",
      "Market analysis reports",
      "Listing optimization",
      "Showing coordination",
      "Transaction management"
    ],
    fullDescription: "The Broker Tools Package provides real estate professionals with everything needed to market and manage properties effectively. This comprehensive suite includes advanced property valuation tools to accurately price listings, detailed market analysis reports for client presentations, listing optimization services to maximize visibility, showing coordination to streamline the viewing process, and complete transaction management from offer to closing. This package is designed to enhance broker productivity and increase successful transactions."
  }
];

export const getServiceById = (id: string): ServicePlan | undefined => {
  return services.find(service => service.id === id);
};
