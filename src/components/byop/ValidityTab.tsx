import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

const validityOptions = [
  { value: "1", label: "1 Day" },
  { value: "7", label: "7 Days" },
  { value: "30", label: "30 Days" },
  { value: "90", label: "90 Days" },
];

interface ValidityTabProps {
  form: UseFormReturn<any>;
  validityFields: any[];
  appendValidity: () => void;
}

export function ValidityTab({ form, validityFields, appendValidity }: ValidityTabProps) {
  return (
    <div className="space-y-4">
      {validityFields.map((field, index) => (
        <Card key={field.id}>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name={`validityPeriods.${index}.duration`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validity Period</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {validityOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={appendValidity}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Validity Period
      </Button>
    </div>
  );
}