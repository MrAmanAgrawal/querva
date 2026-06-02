export default function AuthBranding() {
  return (
    <div className="flex h-full flex-col justify-between p-12">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500 text-purple-400">
            Q
          </div>

          <h1 className="text-2xl font-bold text-white">
            Querva
          </h1>
        </div>
      </div>

      <div>
        <div className="mb-6 text-xs uppercase tracking-[0.3em] text-purple-400">
          AI DATA PLATFORM
        </div>

        <h2 className="text-6xl font-bold leading-tight text-white">
          Ask anything.
          <br />
          <span className="text-purple-400">
            Get answers.
          </span>
          <br />
          Instantly.
        </h2>

        <p className="mt-8 max-w-md text-lg text-zinc-400">
          Query your database in plain English.
          No SQL expertise required.
        </p>
      </div>

      <div className="text-sm text-zinc-500">
        © 2026 Querva
      </div>
    </div>
  );
}