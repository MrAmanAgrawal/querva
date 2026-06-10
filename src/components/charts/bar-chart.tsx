"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface ChartProps {
    data: any[];
    xKey: string;
    yKey: string;
}

export default function CustomBarChart({
    data,
    xKey,
    yKey,
}: ChartProps) {
    return (
        <div className="h-96 w-full rounded-2xl border border-purple-900/30 bg-black/20 p-6">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <BarChart data={data}>
                    <CartesianGrid
                        stroke="#27272a"
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey={xKey}
                        tick={{ fill: "#a1a1aa" }}
                        axisLine={{ stroke: "#3f3f46" }}
                    />

                    <YAxis
                        tick={{ fill: "#a1a1aa" }}
                        axisLine={{ stroke: "#3f3f46" }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#18181b",
                            border: "1px solid #9333ea",
                            borderRadius: "12px",
                            color: "#ffffff",
                        }}
                    />

                    <Bar
                        dataKey={yKey}
                        fill="#a855f7"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}