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

interface Action {
  id: string;
  attribute: string;
  value: string;
}

const actionAttributes = [
  "commissionPercentage",
  "loyaltyPoints",
  "customerSegment",
  "discountAmount",
  "bonusPoints",
];

export const RuleActions = () => {
  const [actions, setActions] = useState<Action[]>([
    { id: "1", attribute: "", value: "" },
  ]);

  const addAction = () => {
    setActions([
      ...actions,
      { id: Date.now().toString(), attribute: "", value: "" },
    ]);
  };

  const removeAction = (id: string) => {
    if (actions.length > 1) {
      setActions(actions.filter((a) => a.id !== id));
    }
  };

  const updateAction = (
    id: string,
    field: keyof Action,
    value: string
  ) => {
    setActions(
      actions.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Actions</h3>
        <Button type="button" variant="outline" onClick={addAction}>
          <Plus className="mr-2 h-4 w-4" />
          Add Action
        </Button>
      </div>

      <div className="space-y-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <Select
              value={action.attribute}
              onValueChange={(value) =>
                updateAction(action.id, "attribute", value)
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select attribute" />
              </SelectTrigger>
              <SelectContent>
                {actionAttributes.map((attr) => (
                  <SelectItem key={attr} value={attr}>
                    {attr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Enter value"
              value={action.value}
              onChange={(e) =>
                updateAction(action.id, "value", e.target.value)
              }
              className="flex-1"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeAction(action.id)}
              className="text-destructive"
              disabled={actions.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};