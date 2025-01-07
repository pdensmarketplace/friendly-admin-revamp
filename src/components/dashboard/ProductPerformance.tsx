import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Mobile Plans", value: 2400, trend: 3400 },
  { name: "Internet", value: 1398, trend: 2210 },
  { name: "TV Packages", value: 9800, trend: 2290 },
  { name: "Devices", value: 3908, trend: 2000 },
  { name: "Add-ons", value: 4800, trend: 2181 },
];

export function ProductPerformance() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#F97316"
              strokeWidth={2}
              dot={{ fill: "#F97316" }}
            />
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#0EA5E9"
              strokeWidth={2}
              dot={{ fill: "#0EA5E9" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}