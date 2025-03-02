"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample Chart Data
const chartData1 = [
  { month: "December", fuzzie: 90, plura: 130 },
  { month: "January", fuzzie: 73, plura: 190 },
  { month: "February", fuzzie: 209, plura: 140 },
  { month: "March", fuzzie: 73, plura: 190 },
];

const chartData2 = [
  { month: "March", fuzzie: 150, plura: 200 },
  { month: "March", fuzzie: 90, plura: 34 },
  { month: "March", fuzzie: 145, plura: 187 },
  { month: "March", fuzzie: 201, plura: 90 },
  { month: "March", fuzzie: 220, plura: 283 },
];

// Chart Config
const chartConfig = {
  fuzzie: {
    label: "Fuzzie",
    color: "hsl(var(--chart-1))",
  },
  plura: {
    label: "Plura",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Activity() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      {/* Responsive container: column on mobile, row on larger screens */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
        {/* First Chart */}
        <Card className="w-full md:w-1/2 min-w-[300px]">
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
            <CardDescription>January - March 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData1} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="fuzzie"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ fill: "#4F46E5", r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="plura"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              You have completed 58% of your projects{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total files completed in 4 months
            </div>
          </CardFooter>
        </Card>

        {/* Second Chart */}
        <Card className="w-full md:w-1/2 min-w-[300px]">
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
            <CardDescription>This Month (1-20 March)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  accessibilityLayer
                  data={chartData2}
                  margin={{
                    top: 20,
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line
                    dataKey="fuzzie"
                    type="monotone"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ fill: "#4F46E5", r: 5 }}
                    activeDot={{ r: 8 }}
                  >
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Line>
                  <Line
                    dataKey="plura"
                    type="monotone"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: "#4F46E5", r: 5 }}
                    activeDot={{ r: 8 }}
                  >
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              You have completed 32% of your project this month
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total files completed this month
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
