import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    sales: 4000,
    visits: 2400,
  },
  {
    name: "Feb",
    sales: 3000,
    visits: 1398,
  },
  {
    name: "Mar",
    sales: 2000,
    visits: 9800,
  },
  {
    name: "Apr",
    sales: 2780,
    visits: 3908,
  },
  {
    name: "May",
    sales: 1890,
    visits: 4800,
  },
  {
    name: "Jun",
    sales: 2390,
    visits: 3800,
  },
];

export function EshopAnalytics() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>E-shop Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="sales" fill="#D946EF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="visits" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}