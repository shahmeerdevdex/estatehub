
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PropertyCondition, ServiceType, UnitType } from "@/types/property";
import { ArrowLeft, ArrowRight, Upload, Camera, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STEPS = ["Property Basics", "Services", "Upload Photos", "Contact Info", "Review & Submit"];

export function PropertyIntakeForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    unitType: "single-family" as UnitType,
    condition: "good" as PropertyCondition,
    services: [] as ServiceType[],
    photos: [] as File[],
    photoUrls: [] as string[],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  
  const { toast } = useToast();

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Property Basics
        if (!formData.address) {
          toast({
            title: "Missing information",
            description: "Please enter the property address",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 1: // Services
        if (formData.services.length === 0) {
          toast({
            title: "Missing information",
            description: "Please select at least one service",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 3: // Contact Info
        if (!formData.contactName || !formData.contactEmail || !formData.contactPhone) {
          toast({
            title: "Missing information",
            description: "Please fill out all contact information fields",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceToggle = (service: ServiceType) => {
    setFormData((prev) => {
      const isSelected = prev.services.includes(service);
      if (isSelected) {
        return {
          ...prev,
          services: prev.services.filter((s) => s !== service),
        };
      } else {
        return {
          ...prev,
          services: [...prev.services, service],
        };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...selectedFiles],
      }));
      
      // Create preview URLs for the photos
      const newPhotoUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        photoUrls: [...prev.photoUrls, ...newPhotoUrls]
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => {
      const updatedPhotos = [...prev.photos];
      const updatedUrls = [...prev.photoUrls];
      updatedPhotos.splice(index, 1);
      updatedUrls.splice(index, 1);
      return {
        ...prev,
        photos: updatedPhotos,
        photoUrls: updatedUrls,
      };
    });
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setIsSubmitting(true);
    
    try {
      // Save submission (Mock API call for now)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Success!",
        description: "Your property intake has been submitted successfully.",
      });
      
      // Reset form or redirect
      window.scrollTo(0, 0);
      setCurrentStep(0);
      setFormData({
        address: "",
        unitType: "single-family",
        condition: "good",
        services: [],
        photos: [],
        photoUrls: [],
        contactName: "",
        contactEmail: "",
        contactPhone: "",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your property intake.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {STEPS.map((step, index) => (
            <div 
              key={step} 
              className="flex flex-col items-center"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
                  ${index < currentStep 
                    ? "bg-green-500 text-white" 
                    : index === currentStep 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-500"}`}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`text-xs text-center ${index === currentStep ? "font-medium" : "text-gray-500"}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full h-1 bg-gray-200 mt-4 mb-8 relative">
          <div 
            className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle>{STEPS[currentStep]}</CardTitle>
          <CardDescription>
            {currentStep === 0 && "Let's start with the basic details about your property."}
            {currentStep === 1 && "Select the services you're interested in."}
            {currentStep === 2 && "Upload photos of your property to help us understand its condition."}
            {currentStep === 3 && "Provide your contact information so we can reach out to you."}
            {currentStep === 4 && "Review your information before submitting."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Property Basics */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Property Address</Label>
                <Textarea 
                  id="address" 
                  placeholder="Enter the full property address" 
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="min-h-20"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Unit Type</Label>
                <RadioGroup 
                  value={formData.unitType} 
                  onValueChange={(value) => handleChange("unitType", value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single-family" id="single-family" />
                    <Label htmlFor="single-family">Single-Family</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multi-unit" id="multi-unit" />
                    <Label htmlFor="multi-unit">Multi-Unit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="condo" id="condo" />
                    <Label htmlFor="condo">Condo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="commercial" id="commercial" />
                    <Label htmlFor="commercial">Commercial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other-unit" />
                    <Label htmlFor="other-unit">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Property Condition</Label>
                <RadioGroup 
                  value={formData.condition} 
                  onValueChange={(value) => handleChange("condition", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="needs-minor-repairs" id="minor-repairs" />
                    <Label htmlFor="minor-repairs">Needs Minor Repairs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="needs-full-rehab" id="full-rehab" />
                    <Label htmlFor="full-rehab">Needs Full Rehab</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <Label>Select Services (Choose all that apply)</Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Checkbox 
                    id="smart-lock-install" 
                    checked={formData.services.includes("smart-lock-install")} 
                    onCheckedChange={() => handleServiceToggle("smart-lock-install")}
                  />
                  <div>
                    <Label htmlFor="smart-lock-install" className="font-medium">Smart Lock Install</Label>
                    <p className="text-sm text-gray-500">Secure property access with keyless entry system</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Checkbox 
                    id="violation-check" 
                    checked={formData.services.includes("violation-check")} 
                    onCheckedChange={() => handleServiceToggle("violation-check")}
                  />
                  <div>
                    <Label htmlFor="violation-check" className="font-medium">Violation/Fine Check</Label>
                    <p className="text-sm text-gray-500">Comprehensive review of open city violations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Checkbox 
                    id="repair-inspection" 
                    checked={formData.services.includes("repair-inspection")} 
                    onCheckedChange={() => handleServiceToggle("repair-inspection")}
                  />
                  <div>
                    <Label htmlFor="repair-inspection" className="font-medium">Full Repair Inspection</Label>
                    <p className="text-sm text-gray-500">Detailed property condition assessment</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Checkbox 
                    id="rent-ready-estimate" 
                    checked={formData.services.includes("rent-ready-estimate")} 
                    onCheckedChange={() => handleServiceToggle("rent-ready-estimate")}
                  />
                  <div>
                    <Label htmlFor="rent-ready-estimate" className="font-medium">Rent-Ready Repair Estimate</Label>
                    <p className="text-sm text-gray-500">Cost estimate to make property market-ready</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Checkbox 
                    id="rent-collection" 
                    checked={formData.services.includes("rent-collection")} 
                    onCheckedChange={() => handleServiceToggle("rent-collection")}
                  />
                  <div>
                    <Label htmlFor="rent-collection" className="font-medium">Ongoing Rent Collection</Label>
                    <p className="text-sm text-gray-500">Streamlined rent collection and management</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Checkbox 
                    id="eviction-services" 
                    checked={formData.services.includes("eviction-services")} 
                    onCheckedChange={() => handleServiceToggle("eviction-services")}
                  />
                  <div>
                    <Label htmlFor="eviction-services" className="font-medium">Eviction Services</Label>
                    <p className="text-sm text-gray-500">Legal and logistical support for evictions</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Photo Uploads */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload files</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file"
                      accept="image/*" 
                      multiple 
                      className="sr-only" 
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB each</p>
              </div>
              
              {formData.photoUrls.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium">Uploaded photos</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {formData.photoUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
                          <img
                            src={url}
                            alt={`Property photo ${index + 1}`}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePhoto(index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Contact Info */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Full Name</Label>
                <Input
                  id="contactName"
                  placeholder="Your name"
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={formData.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Review your information</h3>
              
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="text-sm font-medium text-gray-500">Property Details</h4>
                  <p className="mt-1">{formData.address}</p>
                  <div className="mt-1 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Type:</span>
                    <span>{formData.unitType.replace('-', ' ')}</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Condition:</span>
                    <span>{formData.condition.replace('-', ' ')}</span>
                  </div>
                </div>
                
                <div className="border-b pb-2">
                  <h4 className="text-sm font-medium text-gray-500">Selected Services</h4>
                  <ul className="mt-1 list-disc list-inside">
                    {formData.services.map((service) => (
                      <li key={service}>
                        {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-b pb-2">
                  <h4 className="text-sm font-medium text-gray-500">Photos</h4>
                  {formData.photos.length > 0 ? (
                    <p className="mt-1">{formData.photos.length} photo{formData.photos.length !== 1 ? 's' : ''} uploaded</p>
                  ) : (
                    <p className="mt-1 text-gray-500">No photos uploaded</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                  <p className="mt-1">{formData.contactName}</p>
                  <p className="mt-1">{formData.contactEmail}</p>
                  <p className="mt-1">{formData.contactPhone}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
