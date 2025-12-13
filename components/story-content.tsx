import ReactMarkdown from "react-markdown";
import type { GitHubRepo } from "@/types";

interface StoryContentProps {
  repoData: GitHubRepo;
  completion: string;
  isGenerating: boolean;
}

export function StoryContent({
  repoData,
  completion,
  isGenerating,
}: StoryContentProps) {
  return (
    <div className="flex-1 space-y-6 min-w-0">
      {/* Repo Header */}
      <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-lg p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
          {repoData.fullName}
        </h2>
        <p className="text-neutral-400 text-base md:text-lg mb-6 max-w-3xl">
          {repoData.description}
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-white/80">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span aria-hidden>★</span>
            {repoData.stars.toLocaleString()} stars
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span aria-hidden>◎</span>
            {repoData.contributors.length} contributors
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span aria-hidden>⌘</span>
            {repoData.language}
          </span>
        </div>
      </div>

      {/* Story Content */}
      {isGenerating && !completion && (
        <div className="flex items-center gap-3 border border-white/10 rounded-xl p-4 bg-black/30 backdrop-blur-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <span className="text-neutral-200 font-medium">
            Generating story...
          </span>
        </div>
      )}

      {completion && (
        <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-neutral-300 prose-a:text-white prose-a:no-underline prose-strong:text-white">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-white/30 hover:border-white transition-colors pb-0.5"
                  />
                ),
                h2: ({ node, children, ...props }) => {
                  const text = children?.toString() || "";
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <h2
                      id={id}
                      className="scroll-mt-8 text-2xl font-semibold tracking-tight mt-10 mb-4"
                      {...props}
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ node, children, ...props }) => {
                  const text = children?.toString() || "";
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <h3
                      id={id}
                      className="scroll-mt-8 text-xl font-semibold mt-6 mb-2"
                      {...props}
                    >
                      {children}
                    </h3>
                  );
                },
              }}
            >
              {completion}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
