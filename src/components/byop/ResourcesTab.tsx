import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

const resourceTypes = [
  { value: "data", label: "Data" },
  { value: "sms", label: "SMS" },
  { value: "calls", label: "Calls" },
  { value: "social", label: "Social Media" },
];

interface ResourcesTabProps {
  form: UseFormReturn<any>;
  validityFields: any[];
}

export function ResourcesTab({ form, validityFields }: ResourcesTabProps) {
  return (
    <div className="space-y-4">
      {validityFields.map((validityField, validityIndex) => (
        <Card key={validityField.id}>
          <CardHeader>
            <CardTitle className="text-lg">
              Validity Period {validityIndex + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {form.watch(`validityPeriods.${validityIndex}.resources`)?.map(
              (_: any, resourceIndex: number) => (
                <div
                  key={resourceIndex}
                  className="grid gap-4 border p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Resource {resourceIndex + 1}</h4>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name={`validityPeriods.${validityIndex}.resources.${resourceIndex}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resource Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select resource type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {resourceTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`validityPeriods.${validityIndex}.resources.${resourceIndex}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter amount"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`validityPeriods.${validityIndex}.resources.${resourceIndex}.unit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <FormControl>
                            <Input placeholder="GB/SMS/Minutes" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`validityPeriods.${validityIndex}.resources.${resourceIndex}.jump`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jump Value</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter jump value"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                form.setValue(`validityPeriods.${validityIndex}.resources`, [
                  ...(form.watch(`validityPeriods.${validityIndex}.resources`) ||
                    []),
                  {
                    type: "",
                    amount: "",
                    unit: "",
                    jump: "",
                    priceSlabs: [{ from: "", to: "", price: "" }],
                  },
                ])
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}