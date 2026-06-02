export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-purple-900/30 px-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Querva Workspace
        </h2>

        <p className="text-sm text-zinc-400">
          AI Data Analyst Platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white">
          A
        </div>
      </div>
    </header>
  );
}