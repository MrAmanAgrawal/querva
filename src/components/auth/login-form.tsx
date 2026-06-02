"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/features/auth/services/auth.service";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
  try {
    setLoading(true);

    const { error } = await signIn(
      email,
      password
    );

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/console");

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex h-full items-center justify-center p-12">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-5xl font-bold text-white">
          Welcome back
        </h1>

        <p className="mb-8 text-zinc-400">
          Sign in to your workspace
        </p>

        <Button
          variant="outline"
          className="mb-4 w-full border-purple-900 bg-transparent text-white hover:bg-purple-950"
        >
          Continue with Google
        </Button>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs text-zinc-500">
            OR
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Email
            </label>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aman@example.com"
              className="border-zinc-800 bg-transparent text-white"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm text-zinc-400">
                Password
              </label>

              <button
                type="button"
                className="text-sm text-purple-400"
              >
                Forgot?
              </button>
            </div>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border-zinc-800 bg-transparent text-white"
            />
          </div>

          <Button className="h-12 w-full bg-purple-600 hover:bg-purple-700"
            onClick={handleLogin}
            disabled={loading}>
            {loading ? "Signing In..." : "Sign In →"}
          </Button>
        </div>

        <p className="mt-8 text-center text-zinc-400">
          No account?{" "}
          <Link
            href="/signup"
            className="text-purple-400"
          >
            Sign up free
          </Link>
        </p>

        <div className="mt-12 flex justify-center gap-6 text-sm text-zinc-500">
          <span>SOC 2</span>
          <span>Encrypted</span>
          <span>AI Powered</span>
        </div>
      </div>
    </div>
  );
}