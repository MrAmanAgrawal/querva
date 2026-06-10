"use client";

interface Props {
  insight: string;
}

export default function ChartInsight({
  insight,
}: Props) {
  return (
    <div className="mt-4 rounded-xl border border-purple-900/30 bg-black/30 p-4">
      <p className="text-sm text-zinc-300">
        💡 {insight}
      </p>
    </div>
  );
}