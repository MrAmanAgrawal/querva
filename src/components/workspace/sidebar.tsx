import Link from "next/link";
export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-purple-900/30 bg-black/20">
      
      {/* Logo */}
      <div className="border-b border-purple-900/30 p-6">
        <h1 className="text-2xl font-bold text-white">
          Querva
        </h1>
      </div>

      {/* New Analysis */}
      <div className="p-4">
        <Link
            href="/chat"
            className="block w-full rounded-xl bg-purple-600 px-4 py-3 text-center text-white transition hover:bg-purple-700"
  >
    + New Analysis
        </Link>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 px-4">
        <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">
          Recent Chats
        </p>

        <div className="space-y-2">
          <div className="cursor-pointer rounded-lg p-3 text-zinc-400 hover:bg-purple-950">
            Sales Analysis
          </div>

          <div className="cursor-pointer rounded-lg p-3 text-zinc-400 hover:bg-purple-950">
            Revenue Forecast
          </div>

          <div className="cursor-pointer rounded-lg p-3 text-zinc-400 hover:bg-purple-950">
            Customer Insights
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-purple-900/30 p-4">
        <div className="space-y-2">
          <div className="cursor-pointer rounded-lg p-3 text-zinc-400 hover:bg-purple-950">
            Data Sources
          </div>

          <div className="cursor-pointer rounded-lg p-3 text-zinc-400 hover:bg-purple-950">
            Reports
          </div>

          <div className="cursor-pointer rounded-lg p-3 text-zinc-400 hover:bg-purple-950">
            Settings
          </div>
        </div>
      </div>

    </aside>
  );
}