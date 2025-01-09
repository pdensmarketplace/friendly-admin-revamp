import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoTabProps {
  form: UseFormReturn<any>;
}

export function BasicInfoTab({ form }: BasicInfoTabProps) {
  return (
    <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Package Name</FormLabel>
            <FormControl>
              <Input placeholder="Ultimate Data & Talk Bundle" {...field} />
            </FormControl>
            <FormDescription>
              Enter a descriptive name for your package.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Package Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="prepaid">Prepaid</SelectItem>
                <SelectItem value="postpaid">Postpaid</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Choose the type of package you want to create.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Set the initial status of your package.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit">Next</Button>
    </form>
  );
}