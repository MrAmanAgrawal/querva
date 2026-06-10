"use client";

import { useState, useEffect } from "react";

import { calculateKpiValue }
    from "@/lib/kpi-calculator";

import { formatKpiValue }
    from "@/lib/format-kpi";

import WorkspaceLayout
    from "@/components/workspace/workspace-layout";

import { useDataset }
    from "@/providers/dataset-provider";

import DynamicChart
    from "@/components/charts/dynamic-chart";

import KPICard
    from "@/components/kpi/kpi-card";

import ChartInsight
    from "@/components/charts/chart-insight";


export default function VisualizationsPage() {
    const {
        fileName,
        rowCount,
        columns,
        previewData,
    } = useDataset();

    const [
        recommendations,
        setRecommendations,
    ] = useState<any[]>([]);

    const [
        loadingRecommendations,
        setLoadingRecommendations,
    ] = useState(false);

    const [kpis, setKpis] =
        useState<any[]>([]);

    const [loadingKpis, setLoadingKpis] =
        useState(false);

    const [insights, setInsights] =
        useState<Record<string, string>>({});

    const fetchRecommendations =
        async () => {
            if (!columns.length) return;

            setLoadingRecommendations(true);

            try {
                const response = await fetch(
                    "/api/chart-recommendations",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            fileName,
                            columns,
                        }),
                    }
                );

                const data =
                    await response.json();

                setRecommendations(
                    data.recommendations || []
                );

                console.log(
                    "AI Recommendations",
                    data.recommendations
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingRecommendations(
                    false
                );
            }
        };

    const fetchKpis = async () => {
        if (!columns.length) return;

        setLoadingKpis(true);

        try {
            const response = await fetch(
                "/api/kpi-recommendations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        fileName,
                        columns,
                        previewData,
                    }),
                }
            );

            const data =
                await response.json();
            console.log(
                "AI KPIs",
                data.kpis
            );

            setKpis(data.kpis || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingKpis(false);
        }
    };
    const fetchInsight = async (
        chart: any
    ) => {
        try {
            const response = await fetch(
                "/api/chart-insights",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        chartTitle: chart.title,
                        chartType: chart.chartType,
                        xColumn: chart.xColumn,
                        yColumn: chart.yColumn,
                        previewData: fullData.slice(0, 50),
                    }),
                }
            );

            const data =
                await response.json();

            setInsights((prev) => ({
                ...prev,
                [chart.title]: data.insight,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRecommendations();
        fetchKpis();
    }, [fileName]);

    useEffect(() => {
        recommendations.forEach(
            (chart) => {
                if (
                    !insights[chart.title]
                ) {
                    fetchInsight(chart);
                }
            }
        );
    }, [recommendations]);

    if (columns.length < 2) {
        return (
            <WorkspaceLayout>
                <div className="mx-auto max-w-7xl">
                    <h1 className="mb-6 text-3xl font-bold text-white">
                        Visual Analytics
                    </h1>

                    <div className="rounded-2xl border border-purple-900/30 bg-black/20 p-6">
                        <p className="text-zinc-400">
                            Upload a dataset to generate charts.
                        </p>
                    </div>
                </div>
            </WorkspaceLayout>
        );
    }
    const fullData = JSON.parse(
        localStorage.getItem(
            "querva_full_dataset"
        ) || "[]"
    );
    return (
        <WorkspaceLayout>
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-2 text-3xl font-bold text-white">
                    Visual Analytics
                </h1>

                <p className="mb-8 text-zinc-400">
                    Dataset-powered visualizations
                </p>

                {/* Dataset Overview */}
                <div className="mb-8 rounded-2xl border border-purple-900/30 bg-black/20 p-6">
                    <h2 className="mb-4 text-xl font-semibold text-white">
                        Dataset Overview
                    </h2>

                    <p className="text-zinc-300">
                        File: {fileName}
                    </p>

                    <p className="text-zinc-300">
                        Rows: {rowCount}
                    </p>

                    <p className="text-zinc-300">
                        Columns: {columns.length}
                    </p>
                </div>

                {/* KPI Section */}
                <div className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold text-white">
                        AI Recommended KPIs
                    </h2>

                    {loadingKpis ? (
                        <p className="text-zinc-400">
                            Generating KPIs...
                        </p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {kpis.map((kpi, index) => (
                                <KPICard
                                    key={index}
                                    title={kpi.title}
                                    value={formatKpiValue(
                                        Number(
                                            calculateKpiValue(
                                                fullData,
                                                kpi.column,
                                                kpi.operation
                                            )
                                        ),
                                        kpi.title,
                                        fullData
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* AI Recommendations */}
                <div className="mt-8 rounded-2xl border border-purple-900/30 bg-black/20 p-6">
                    <h2 className="mb-4 text-xl font-semibold text-white">
                        AI Recommended Visualizations
                    </h2>

                    {loadingRecommendations ? (
                        <p className="text-zinc-400">
                            Querva is analyzing your dataset...
                        </p>
                    ) : (
                        <div className="grid gap-6">
                            {recommendations.map(
                                (chart, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-purple-900/30 bg-purple-950/20 p-4"
                                    >
                                        <h3 className="font-semibold text-white">
                                            {chart.title}
                                        </h3>

                                        <p className="mt-2 text-sm text-zinc-400">
                                            Type: {chart.chartType}
                                        </p>

                                        <p className="text-sm text-zinc-400">
                                            X: {chart.xColumn}
                                        </p>

                                        <p className="mb-4 text-sm text-zinc-400">
                                            Y: {chart.yColumn}
                                        </p>

                                        <DynamicChart
                                            chart={chart}
                                            data={fullData}
                                        />

                                        <ChartInsight
                                            insight={
                                                insights[chart.title] ||
                                                "Generating insight..."
                                            }
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </WorkspaceLayout>
    );
}