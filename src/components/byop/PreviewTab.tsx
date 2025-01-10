import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PreviewTabProps {
  form: UseFormReturn<any>;
}

export function PreviewTab({ form }: PreviewTabProps) {
  const [jsonContent, setJsonContent] = useState(() => 
    JSON.stringify(form.watch(), null, 2)
  );

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonContent(e.target.value);
  };

  const handleImport = () => {
    try {
      const parsedJson = JSON.parse(jsonContent);
      form.reset(parsedJson);
      toast({
        title: "Success",
        description: "Package configuration imported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    setJsonContent(JSON.stringify(form.watch(), null, 2));
    toast({
      title: "Success",
      description: "Current configuration exported to JSON",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Package Preview</span>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleExport}>
              Export Current
            </Button>
            <Button onClick={handleImport}>
              Import JSON
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={jsonContent}
          onChange={handleJsonChange}
          className="font-mono min-h-[400px]"
        />
      </CardContent>
    </Card>
  );
}