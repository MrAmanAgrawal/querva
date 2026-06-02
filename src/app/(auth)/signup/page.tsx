import AuthBranding from "@/components/auth/auth-branding";
import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#030014] p-6">
      <div className="mx-auto flex min-h-[95vh] max-w-7xl overflow-hidden rounded-3xl border border-purple-900/50 bg-black/30 backdrop-blur">
        <div className="hidden w-1/2 border-r border-purple-900/30 lg:block">
          <AuthBranding />
        </div>

        <div className="w-full lg:w-1/2">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}