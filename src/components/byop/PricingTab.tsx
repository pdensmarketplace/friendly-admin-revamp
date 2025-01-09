import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface PricingTabProps {
  form: UseFormReturn<any>;
  validityFields: any[];
}

export function PricingTab({ form, validityFields }: PricingTabProps) {
  return (
    <div className="space-y-4">
      {validityFields.map((validityField, validityIndex) => (
        <Card key={validityField.id}>
          <CardHeader>
            <CardTitle className="text-lg">
              Pricing - Validity Period {validityIndex + 1}
            </CardTitle>
          </CardHeader>
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
        </Card>
      ))}
    </div>
  );
}