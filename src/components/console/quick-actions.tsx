export default function QuickActions() {
  const actions = [
    {
      title: "Upload Dataset",
      description: "Upload CSV or Excel files",
    },
    {
      title: "Connect Database",
      description: "PostgreSQL, MySQL & more",
    },
    {
      title: "Create Report",
      description: "Generate AI-powered reports",
    },
  ];

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {actions.map((action) => (
          <div
            key={action.title}
            className="cursor-pointer rounded-2xl border border-purple-900/30 bg-black/20 p-6 transition-all hover:border-purple-500/50 hover:bg-black/40"
          >
            <h3 className="mb-2 text-lg font-semibold text-white">
              {action.title}
            </h3>

            <p className="text-sm text-zinc-400">
              {action.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}