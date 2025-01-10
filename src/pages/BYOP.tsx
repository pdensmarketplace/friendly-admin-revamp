import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { BasicInfoTab } from "@/components/byop/BasicInfoTab";
import { ValidityTab } from "@/components/byop/ValidityTab";
import { ResourcesTab } from "@/components/byop/ResourcesTab";
import { PricingTab } from "@/components/byop/PricingTab";
import { PreviewTab } from "@/components/byop/PreviewTab";
import { SlidersTab } from "@/components/byop/SlidersTab";

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
          jump: z.string(),
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
              jump: "",
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

  const savedPackages = [
    { id: '1', name: 'Basic Package', status: 'active' },
    { id: '2', name: 'Premium Package', status: 'active' },
    { id: '3', name: 'Enterprise Package', status: 'inactive' },
  ];

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
                <div className="text-2xl font-bold">{savedPackages.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-6">
            {/* Side Panel */}
            <Card className="w-64">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Packages</span>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savedPackages.map((pkg) => (
                    <Button
                      key={pkg.id}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      {pkg.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <Card className="flex-1">
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
                    <TabsTrigger value="sliders">Sliders</TabsTrigger>
                  </TabsList>

                  <Form {...form}>
                    <TabsContent value="basic">
                      <BasicInfoTab form={form} />
                    </TabsContent>

                    <TabsContent value="validity">
                      <ValidityTab
                        form={form}
                        validityFields={validityFields}
                        appendValidity={() =>
                          appendValidity({
                            duration: "",
                            resources: [
                              {
                                type: "",
                                amount: "",
                                unit: "",
                                jump: "",
                                priceSlabs: [{ from: "", to: "", price: "" }],
                              },
                            ],
                          })
                        }
                      />
                    </TabsContent>

                    <TabsContent value="resources">
                      <ResourcesTab form={form} validityFields={validityFields} />
                    </TabsContent>

                    <TabsContent value="pricing">
                      <PricingTab form={form} validityFields={validityFields} />
                    </TabsContent>

                    <TabsContent value="preview">
                      <PreviewTab form={form} />
                    </TabsContent>

                    <TabsContent value="sliders">
                      <SlidersTab form={form} validityFields={validityFields} />
                    </TabsContent>
                  </Form>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}