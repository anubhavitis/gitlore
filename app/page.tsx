"use client";

import { useRouter } from "next/navigation";
import { GithubInput } from "@/components/github-input";

export default function Home() {
  const router = useRouter();

  const handleSubmit = (url: string) => {
    // Navigate to story page with GitHub URL
    const encodedUrl = encodeURIComponent(url);
    router.push(`/story?url=${encodedUrl}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <GithubInput onSubmit={handleSubmit} isLoading={false} />
        </div>
      </div>
    </main>
  );
}
