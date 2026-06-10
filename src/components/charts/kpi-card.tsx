interface KPIProps {
  title: string;
  value: string;
}

export default function KPICard({
  title,
  value,
}: KPIProps) {
  return (
    <div className="rounded-2xl border border-purple-900/30 bg-black/20 p-6">
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}