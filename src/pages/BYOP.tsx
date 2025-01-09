import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package, Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Package name must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select a package type.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  validityPeriods: z.array(
    z.object({
      duration: z.string(),
      resources: z.array(
        z.object({
          type: z.string(),
          amount: z.string(),
          unit: z.string(),
          priceSlabs: z.array(
            z.object({
              from: z.string(),
              to: z.string(),
              price: z.string(),
            })
          ),
        })
      ),
    })
  ),
});

const resourceTypes = [
  { value: "data", label: "Data" },
  { value: "sms", label: "SMS" },
  { value: "calls", label: "Calls" },
  { value: "social", label: "Social Media" },
];

const validityOptions = [
  { value: "1", label: "1 Day" },
  { value: "7", label: "7 Days" },
  { value: "30", label: "30 Days" },
  { value: "90", label: "90 Days" },
];

export default function BYOPPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      status: "active",
      validityPeriods: [
        {
          duration: "",
          resources: [
            {
              type: "",
              amount: "",
              unit: "",
              priceSlabs: [{ from: "", to: "", price: "" }],
            },
          ],
        },
      ],
    },
  });

  const { fields: validityFields, append: appendValidity } = useFieldArray({
    control: form.control,
    name: "validityPeriods",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">BYOP Management</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Packages
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Package Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="validity">Validity</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Package Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ultimate Data & Talk Bundle"
                                {...field}
                              />
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
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
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
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
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
                  </Form>
                </TabsContent>

                <TabsContent value="validity" className="space-y-4">
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
                    className="mt-2"
                    onClick={() =>
                      appendValidity({
                        duration: "",
                        resources: [
                          {
                            type: "",
                            amount: "",
                            unit: "",
                            priceSlabs: [{ from: "", to: "", price: "" }],
                          },
                        ],
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Validity Period
                  </Button>
                </TabsContent>

                <TabsContent value="resources" className="space-y-4">
                  {validityFields.map((validityField, validityIndex) => (
                    <Card key={validityField.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Validity Period {validityIndex + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {form.watch(
                          `validityPeriods.${validityIndex}.resources`
                        )?.map((_, resourceIndex) => (
                          <div
                            key={resourceIndex}
                            className="grid gap-4 border p-4 rounded-lg"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">
                                Resource {resourceIndex + 1}
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
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
                                        <SelectItem
                                          key={type.value}
                                          value={type.value}
                                        >
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-2 gap-4">
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
                                      <Input
                                        placeholder="GB/SMS/Minutes"
                                        {...field}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            form.setValue(
                              `validityPeriods.${validityIndex}.resources`,
                              [
                                ...(form.watch(
                                  `validityPeriods.${validityIndex}.resources`
                                ) || []),
                                {
                                  type: "",
                                  amount: "",
                                  unit: "",
                                  priceSlabs: [{ from: "", to: "", price: "" }],
                                },
                              ]
                            )
                          }
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Resource
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
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
                          ?.map((resource, resourceIndex) => (
                            <div
                              key={resourceIndex}
                              className="border p-4 rounded-lg space-y-4"
                            >
                              <h4 className="font-medium">
                                Price Slabs for {resource.type}
                              </h4>
                              {resource.priceSlabs?.map((_, slabIndex) => (
                                <div
                                  key={slabIndex}
                                  className="grid grid-cols-3 gap-4"
                                >
                                  <FormField
                                    control={form.control}
                                    name={`validityPeriods.${validityIndex}.resources.${resourceIndex}.priceSlabs.${slabIndex}.from`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>From</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            placeholder="0"
                                            {...field}
                                          />
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
                                          <Input
                                            type="number"
                                            placeholder="100"
                                            {...field}
                                          />
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
                </TabsContent>

                <TabsContent value="preview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Package Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted p-4 rounded-lg overflow-auto">
                        {JSON.stringify(form.watch(), null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}