import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, ChevronDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface PricingTabProps {
  form: UseFormReturn<any>;
  validityFields: any[];
}

export function PricingTab({ form, validityFields }: PricingTabProps) {
  const [openPanels, setOpenPanels] = useState<number[]>([0]);

  const togglePanel = (index: number) => {
    setOpenPanels(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {validityFields.map((validityField, validityIndex) => (
        <Collapsible
          key={validityField.id}
          open={openPanels.includes(validityIndex)}
          onOpenChange={() => togglePanel(validityIndex)}
        >
          <Card>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">
                  Pricing - Validity Period {validityIndex + 1}
                </CardTitle>
                <ChevronDown className={`h-4 w-4 transition-transform ${openPanels.includes(validityIndex) ? 'transform rotate-180' : ''}`} />
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                {form
                  .watch(`validityPeriods.${validityIndex}.resources`)
                  ?.map((resource: any, resourceIndex: number) => (
                    <div key={resourceIndex} className="border p-4 rounded-lg space-y-4">
                      <h4 className="font-medium">Price Slabs for {resource.type}</h4>
                      {resource.priceSlabs?.map((_: any, slabIndex: number) => (
                        <div key={slabIndex} className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`validityPeriods.${validityIndex}.resources.${resourceIndex}.priceSlabs.${slabIndex}.from`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>From</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`validityPeriods.${validityIndex}.resources.${resourceIndex}.priceSlabs.${slabIndex}.to`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>To</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="100" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`validityPeriods.${validityIndex}.resources.${resourceIndex}.priceSlabs.${slabIndex}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          form.setValue(
                            `validityPeriods.${validityIndex}.resources.${resourceIndex}.priceSlabs`,
                            [
                              ...(resource.priceSlabs || []),
                              { from: "", to: "", price: "" },
                            ]
                          )
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Price Slab
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
}