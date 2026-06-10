"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: any[];
  xKey: string;
  yKey: string;
}

export default function CustomScatterChart({
  data,
  xKey,
  yKey,
}: ChartProps) {
  const chartData = data.filter(
    (row) =>
      !isNaN(Number(row[xKey])) &&
      !isNaN(Number(row[yKey]))
  );

  return (
    <div className="h-96 w-full rounded-2xl border border-purple-900/30 bg-black/20 p-6">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <ScatterChart>
          <CartesianGrid
            stroke="#27272a"
            strokeDasharray="3 3"
          />

          <XAxis
            type="number"
            dataKey={xKey}
            tick={{ fill: "#a1a1aa" }}
            axisLine={{ stroke: "#3f3f46" }}
          />

          <YAxis
            type="number"
            dataKey={yKey}
            tick={{ fill: "#a1a1aa" }}
            axisLine={{ stroke: "#3f3f46" }}
          />

          <Tooltip
            cursor={{
              strokeDasharray: "3 3",
            }}
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #9333ea",
              borderRadius: "12px",
            }}
          />

          <Scatter
            data={chartData}
            fill="#a855f7"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}