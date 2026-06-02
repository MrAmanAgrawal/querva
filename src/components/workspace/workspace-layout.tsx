import Topbar from "./topbar";
import { ReactNode } from "react";
import Sidebar from "./sidebar";

interface WorkspaceLayoutProps {
  children: ReactNode;
}

export default function WorkspaceLayout({
  children,
}: WorkspaceLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#030014]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-8">
            {children}
        </main>
      </div>
    </div>
  );
}