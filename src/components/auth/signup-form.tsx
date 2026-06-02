"use client";
import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/features/auth/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
  try {
    setLoading(true);

    const { error } = await signUp(
      email,
      password
    );

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Account created successfully. Check your email."
    );
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
          Create account
        </h1>

        <p className="mb-8 text-zinc-400">
          Start using Querva today
        </p>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Full Name
            </label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aman Agrawal"
              className="border-zinc-800 bg-transparent text-white"
            />
          </div>

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
            <label className="mb-2 block text-sm text-zinc-400">
              Password
            </label>

            <Input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              className="border-zinc-800 bg-transparent text-white"
            />
          </div>

          <Button
            className="h-12 w-full bg-purple-600 hover:bg-purple-700"
            onClick={handleSignup}
            disabled={loading}
>
            {loading ? "Creating..." : "Create Account →"}
          </Button>
          
        </div>

        <p className="mt-8 text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-400"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}