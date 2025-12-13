"use client";

import { useState, useEffect } from "react";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useGithubRepo } from "@/hooks/use-github-repo";
import { TableOfContents } from "@/components/table-of-contents";
import { ContributorsSidebar } from "@/components/contributors-sidebar";
import { StoryContent } from "@/components/story-content";
import { Navbar } from "@/components/navbar";
import { LoadingState } from "@/components/loading-state";
import type { GitHubRepo } from "@/types";

export default function StoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [repoData, setRepoData] = useState<GitHubRepo | null>(null);
  const [headings, setHeadings] = useState<
    { text: string; level: number; id: string }[]
  >([]);

  const { mutateAsync: fetchRepo, isPending: isFetchingRepo } = useGithubRepo();

  const {
    completion,
    complete,
    isLoading: isGenerating,
  } = useCompletion({
    api: "/api/generate-story",
  });

  // Load repo data from URL params
  useEffect(() => {
    const url = searchParams.get("url");
    if (url) {
      const decodedUrl = decodeURIComponent(url);
      // Fetch repo data
      fetchRepo(decodedUrl)
        .then((data) => {
          setRepoData(data);
          // Generate story
          complete("", {
            body: { repoData: data },
          });
        })
        .catch((err) => {
          toast.error(err.message || "Failed to load repository data");
          router.push("/");
        });
    } else {
      router.push("/");
    }
  }, [searchParams, router, fetchRepo, complete]);

  // Extract headings from markdown (only h2)
  useEffect(() => {
    if (completion) {
      const lines = completion.split("\n");
      const extractedHeadings: { text: string; level: number; id: string }[] =
        [];

      lines.forEach((line) => {
        const match = line.match(/^(#{2})\s+(.+)$/);
        if (match) {
          const level = 2;
          const text = match[2];
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          extractedHeadings.push({ text, level, id });
        }
      });

      setHeadings(extractedHeadings);
    }
  }, [completion]);

  const handleReset = () => {
    router.push("/");
  };

  if (isFetchingRepo || !repoData) {
    return (
      <main className="min-h-screen px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <LoadingState message="Fetching repository data..." />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar repoData={repoData} onReset={handleReset} />

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex gap-6 lg:gap-10">
          <TableOfContents headings={headings} />

          <StoryContent
            repoData={repoData}
            completion={completion}
            isGenerating={isGenerating}
          />

          <ContributorsSidebar contributors={repoData.contributors} />
        </div>
      </div>
    </main>
  );
}
