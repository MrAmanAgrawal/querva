export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-purple-900/30 bg-black/20">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">
          Querva
        </h1>
      </div>

      <nav className="space-y-2 p-4 text-zinc-400">
        <div className="rounded-lg p-3 hover:bg-purple-950">
          Dashboard
        </div>

        <div className="rounded-lg p-3 hover:bg-purple-950">
          Datasets
        </div>

        <div className="rounded-lg p-3 hover:bg-purple-950">
          Reports
        </div>

        <div className="rounded-lg p-3 hover:bg-purple-950">
          Settings
        </div>
      </nav>
    </aside>
  );
}