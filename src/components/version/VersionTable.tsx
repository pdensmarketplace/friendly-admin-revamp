import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";

interface Version {
  id: number;
  platform: string;
  channel: string;
  versionNumber: string;
  themeName: string;
}

const versions: Version[] = [
  {
    id: 33,
    platform: "ios",
    channel: "sc_app",
    versionNumber: "1.0.0",
    themeName: "sc_app_theme",
  },
  {
    id: 26,
    platform: "web",
    channel: "sc_flutter_web",
    versionNumber: "1.0.0",
    themeName: "flutter_web_theme_zn",
  },
  // Add more sample data as needed
];

export const VersionTable = () => {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Channel</TableHead>
            <TableHead>Version Number</TableHead>
            <TableHead>Theme Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {versions.map((version) => (
            <TableRow key={version.id}>
              <TableCell>{version.id}</TableCell>
              <TableCell className="capitalize">{version.platform}</TableCell>
              <TableCell>{version.channel}</TableCell>
              <TableCell>{version.versionNumber}</TableCell>
              <TableCell>{version.themeName}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
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