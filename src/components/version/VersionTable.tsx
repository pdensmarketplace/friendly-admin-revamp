import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2, Filter } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const platforms = ["All", "ios", "web", "android"];
const channels = ["All", "sc_app", "sc_flutter_web"];

export const VersionTable = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedChannel, setSelectedChannel] = useState("All");

  const filteredVersions = versions.filter((version) => {
    const platformMatch = selectedPlatform === "All" || version.platform === selectedPlatform;
    const channelMatch = selectedChannel === "All" || version.channel === selectedChannel;
    return platformMatch && channelMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent>
            {channels.map((channel) => (
              <SelectItem key={channel} value={channel}>
                {channel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Platform</TableHead>
              <TableHead className="font-semibold">Channel</TableHead>
              <TableHead className="font-semibold">Version Number</TableHead>
              <TableHead className="font-semibold">Theme Name</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVersions.map((version) => (
              <TableRow 
                key={version.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">{version.id}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    version.platform === 'ios' ? 'bg-blue-50 text-blue-700' :
                    version.platform === 'web' ? 'bg-purple-50 text-purple-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {version.platform}
                  </span>
                </TableCell>
                <TableCell>{version.channel}</TableCell>
                <TableCell>{version.versionNumber}</TableCell>
                <TableCell>{version.themeName}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};