"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface GithubInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const isValidGithubUrl = (url: string): boolean => {
  const pattern =
    /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/;
  return pattern.test(url.trim());
};

export function GithubInput({ onSubmit, isLoading }: GithubInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      toast.error("Please enter a GitHub URL");
      return;
    }

    if (!isValidGithubUrl(trimmedUrl)) {
      toast.error("Please enter a valid GitHub repository URL");
      return;
    }

    onSubmit(trimmedUrl);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
          Git Story Narrator
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white">
          hear the story of your favorite open source project
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          Drop a GitHub URL and let GitLore weave a clean narrative out of its
          code, commits, and contributors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="relative flex items-center rounded-2xl border border-white/10 bg-black/30 backdrop-blur-lg shadow-[0_10px_60px_rgba(0,0,0,0.45)] focus-within:border-white/40 focus-within:shadow-[0_10px_60px_rgba(255,255,255,0.06)] transition-all">
          <Input
            id="github-url"
            name="github-url"
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="https://github.com/owner/repository"
            autoComplete="off"
            className="w-full bg-transparent border-0 px-6 py-5 h-auto text-lg text-white placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0 autofill:bg-transparent autofill:text-white autofill:shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.35)]"
            disabled={isLoading}
          />
          <div className="absolute inset-y-2 right-2 flex items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-neutral-100 disabled:bg-neutral-700 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Loading…" : "Generate"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
