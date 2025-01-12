import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockRules = [
  {
    id: 1,
    name: "Daily Commission Rule",
    type: "commission",
    frequency: "daily",
    status: "active",
  },
  {
    id: 2,
    name: "Premium Customer Loyalty",
    type: "loyalty",
    frequency: "weekly",
    status: "active",
  },
  {
    id: 3,
    name: "High Value Customer Segment",
    type: "segmentation",
    frequency: "instant",
    status: "inactive",
  },
];

export const RuleList = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockRules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell className="font-medium">{rule.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {rule.type}
                </Badge>
              </TableCell>
              <TableCell className="capitalize">{rule.frequency}</TableCell>
              <TableCell>
                <Badge
                  variant={rule.status === "active" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {rule.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/rule-engine/edit/${rule.id}`)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};