"use client";

import CustomBarChart from "./bar-chart";
import CustomLineChart from "./line-chart";
import CustomScatterChart from "./scatter-chart";

interface DynamicChartProps {
    chart: {
        title: string;
        chartType: string;
        xColumn: string;
        yColumn: string;
    };

    data: any[];
}

export default function DynamicChart({
    chart,
    data,
}: DynamicChartProps) {
    if (
        !chart.xColumn ||
        !chart.yColumn
    ) {
        return null;
    }

    switch (chart.chartType) {
        case "bar":
            return (
                <CustomBarChart
                    data={data}
                    xKey={chart.xColumn}
                    yKey={chart.yColumn}
                />
            );

        case "line":
            return (
                <CustomLineChart
                    data={data}
                    xKey={chart.xColumn}
                    yKey={chart.yColumn}
                />
            );

        case "scatter":
            return (
                <CustomScatterChart
                    data={data}
                    xKey={chart.xColumn}
                    yKey={chart.yColumn}
                />
            );

        default:
            return (
                <div className="rounded-xl border border-purple-900/30 p-4">
                    <p className="text-zinc-400">
                        Unsupported chart type.
                    </p>
                </div>
            );
    }
}