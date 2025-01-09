import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";

interface PreviewTabProps {
  form: UseFormReturn<any>;
}

export function PreviewTab({ form }: PreviewTabProps) {
  return (
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
  );
}