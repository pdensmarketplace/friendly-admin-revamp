import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"

const formSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  channel: z.string().min(1, "Channel is required"),
  versionNumber: z.string().min(1, "Version number is required"),
  themeName: z.string().min(1, "Theme name is required"),
})

export function AddVersionForm({ onSubmit }: { onSubmit: (values: z.infer<typeof formSchema>) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      channel: "",
      versionNumber: "",
      themeName: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ios">iOS</SelectItem>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="channel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sc_app">SC App</SelectItem>
                  <SelectItem value="sc_flutter_web">SC Flutter Web</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="versionNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Version Number</FormLabel>
              <FormControl>
                <Input placeholder="1.0.0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="themeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter theme name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit">Add Version</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}