import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RuleConditions } from "./RuleConditions";
import { RuleActions } from "./RuleActions";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["commission", "loyalty", "segmentation"]),
  frequency: z.enum(["instant", "daily", "weekly", "custom"]),
});

interface RuleFormProps {
  mode: "create" | "edit";
  ruleId?: string;
}

export const RuleForm = ({ mode, ruleId }: RuleFormProps) => {
  const navigate = useNavigate();
  const [testValues, setTestValues] = useState<Record<string, string>>({});
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "commission",
      frequency: "instant",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Rule saved successfully");
    navigate("/rule-engine");
  };

  const handleTestRule = () => {
    // Here you would implement the actual rule testing logic
    console.log("Testing rule with values:", testValues);
    toast.success("Rule verified successfully!");
  };

  return (
    <div className="p-6 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rule Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter rule name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rule Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rule type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="commission">Commission</SelectItem>
                        <SelectItem value="loyalty">Loyalty</SelectItem>
                        <SelectItem value="segmentation">Segmentation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="instant">Instant</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rule Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RuleConditions />
              <RuleActions />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline">
                  Test Rule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Test Rule Configuration</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <FormLabel>Order Value</FormLabel>
                      <Input
                        type="number"
                        placeholder="Enter order value"
                        onChange={(e) =>
                          setTestValues((prev) => ({
                            ...prev,
                            orderValue: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Customer Type</FormLabel>
                      <Input
                        placeholder="Enter customer type"
                        onChange={(e) =>
                          setTestValues((prev) => ({
                            ...prev,
                            customerType: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <Button onClick={handleTestRule} className="w-full">
                    Verify Rule
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/rule-engine")}
              >
                Cancel
              </Button>
              <Button type="submit">Save Rule</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};