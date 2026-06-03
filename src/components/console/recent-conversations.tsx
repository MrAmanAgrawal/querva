export default function RecentConversations() {
  const conversations = [
    "Sales Performance Analysis",
    "Customer Churn Insights",
    "Revenue Forecast Report",
  ];

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Recent Conversations
      </h2>

      <div className="space-y-3">
        {conversations.map((chat) => (
          <div
            key={chat}
            className="rounded-xl border border-purple-900/30 bg-black/20 p-4 text-zinc-300 hover:border-purple-500/50"
          >
            {chat}
          </div>
        ))}
      </div>
    </div>
  );
}