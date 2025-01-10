import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SlidersTabProps {
  form: UseFormReturn<any>;
  validityFields: any[];
}

export function SlidersTab({ form, validityFields }: SlidersTabProps) {
  const [selectedValidity, setSelectedValidity] = useState<number | null>(null);
  const [selectedResources, setSelectedResources] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const calculatePrice = () => {
    if (selectedValidity === null) return 0;

    const resources = form.watch(`validityPeriods.${selectedValidity}.resources`) || [];
    let totalPrice = 0;

    resources.forEach((resource: any) => {
      const selectedValue = selectedResources[resource.type] || 0;
      const priceSlabs = resource.priceSlabs || [];

      const applicableSlab = priceSlabs.find((slab: any) => {
        const from = Number(slab.from) || 0;
        const to = Number(slab.to) || Infinity;
        return selectedValue >= from && selectedValue <= to;
      });

      if (applicableSlab) {
        totalPrice += Number(applicableSlab.price) || 0;
      }
    });

    return totalPrice;
  };

  const handleResourceChange = (type: string, value: number[]) => {
    setSelectedResources(prev => ({
      ...prev,
      [type]: value[0]
    }));
  };

  const handleSave = () => {
    if (selectedValidity === null) {
      toast({
        title: "Error",
        description: "Please select a validity period first",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save the configuration
    const configuration = {
      validityPeriod: selectedValidity,
      resources: selectedResources,
      totalPrice: calculatePrice(),
    };

    console.log('Saving configuration:', configuration);
    
    toast({
      title: "Success",
      description: "Configuration saved successfully",
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Select Validity Period</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            {validityFields.map((field, index) => (
              <Button
                key={field.id}
                variant={selectedValidity === index ? "default" : "outline"}
                onClick={() => setSelectedValidity(index)}
              >
                {form.watch(`validityPeriods.${index}.duration`)} Days
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedValidity !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Configure Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {form.watch(`validityPeriods.${selectedValidity}.resources`)?.map((resource: any, index: number) => (
              <div key={index} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{resource.type}</h4>
                  <span className="text-sm text-muted-foreground">
                    {selectedResources[resource.type] || 0} {resource.unit}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={Number(resource.amount) || 100}
                  step={Number(resource.jump) || 1}
                  value={[selectedResources[resource.type] || 0]}
                  onValueChange={(value) => handleResourceChange(resource.type, value)}
                />
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-lg font-medium">Total Price</span>
              <span className="text-lg font-bold">₹ {calculatePrice().toFixed(2)}</span>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSave}>
                Save Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}