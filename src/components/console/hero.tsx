import RecentConversations from "./recent-conversations";
import QuickActions from "./quick-actions";
import { Input } from "@/components/ui/input";

export default function Hero() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      
      <div className="mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
        AI-Powered Analytics
      </div>

      <h1 className="mb-4 text-6xl font-bold text-white">
        Ask Querva.
      </h1>

      <p className="mb-2 text-2xl text-zinc-300">
        Your AI Data Analyst
      </p>

      <p className="mb-10 max-w-2xl text-zinc-500">
        Turn raw data into answers, charts and actionable
        insights in seconds.
      </p>

      <div className="w-full max-w-3xl">
        <Input
          placeholder="Ask anything about your data..."
          className="h-14 border-purple-900/30 bg-black/20 text-white"
        />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <span className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
          SQL Generation
        </span>

        <span className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
          Data Analysis
        </span>

        <span className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
          Charts
        </span>

        <span className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
          Insights
        </span>

        <span className="rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
          Reports
        </span>
      </div>

      <QuickActions />
      <RecentConversations />
    </div>
  );
}