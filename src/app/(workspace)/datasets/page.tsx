import WorkspaceLayout from "@/components/workspace/workspace-layout";
import DatasetUploader from "@/components/datasets/dataset-uploader";
import AIInsights from "@/components/datasets/ai-insights";

export default function DatasetsPage() {
  return (
    <WorkspaceLayout>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Datasets
        </h1>

        <p className="mb-8 text-zinc-400">
          Upload and manage your datasets.
        </p>

        <div className="space-y-6">
          <DatasetUploader />

          <AIInsights />
        </div>
      </div>
    </WorkspaceLayout>
  );
}