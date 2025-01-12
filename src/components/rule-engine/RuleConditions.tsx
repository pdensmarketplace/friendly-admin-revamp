import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Condition {
  id: string;
  attribute: string;
  operator: string;
  value: string;
}

const attributes = [
  "orderValue",
  "orderCount",
  "customerType",
  "customerSegment",
  "productCategory",
];

const operators = [
  "equals",
  "notEquals",
  "greaterThan",
  "lessThan",
  "contains",
  "notContains",
];

export const RuleConditions = () => {
  const [conditions, setConditions] = useState<Condition[]>([
    { id: "1", attribute: "", operator: "", value: "" },
  ]);

  const addCondition = () => {
    setConditions([
      ...conditions,
      { id: Date.now().toString(), attribute: "", operator: "", value: "" },
    ]);
  };

  const removeCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((c) => c.id !== id));
    }
  };

  const updateCondition = (
    id: string,
    field: keyof Condition,
    value: string
  ) => {
    setConditions(
      conditions.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Conditions</h3>
        <Button type="button" variant="outline" onClick={addCondition}>
          <Plus className="mr-2 h-4 w-4" />
          Add Condition
        </Button>
      </div>

      <div className="space-y-4">
        {conditions.map((condition) => (
          <div
            key={condition.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <Select
              value={condition.attribute}
              onValueChange={(value) =>
                updateCondition(condition.id, "attribute", value)
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select attribute" />
              </SelectTrigger>
              <SelectContent>
                {attributes.map((attr) => (
                  <SelectItem key={attr} value={attr}>
                    {attr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={condition.operator}
              onValueChange={(value) =>
                updateCondition(condition.id, "operator", value)
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                {operators.map((op) => (
                  <SelectItem key={op} value={op}>
                    {op}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Enter value"
              value={condition.value}
              onChange={(e) =>
                updateCondition(condition.id, "value", e.target.value)
              }
              className="flex-1"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeCondition(condition.id)}
              className="text-destructive"
              disabled={conditions.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};