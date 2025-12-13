import type { Contributor } from "@/types";

interface ContributorsSidebarProps {
  contributors: Contributor[];
}

export function ContributorsSidebar({
  contributors,
}: ContributorsSidebarProps) {
  return (
    <div className="w-72 flex-shrink-0 hidden lg:block">
      <div className="sticky top-8 border border-white/10 bg-black/30 backdrop-blur-lg rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-sm mb-5 text-white flex items-center gap-2 tracking-tight uppercase">
          <span className="text-lg">◎</span>
          Characters
        </h3>
        <div className="space-y-3">
          {contributors.map((contributor) => (
            <a
              key={contributor.login}
              href={`https://github.com/${contributor.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-all hover:shadow-sm group border border-transparent hover:border-white/10"
            >
              <img
                src={contributor.avatar}
                alt={contributor.login}
                className="w-12 h-12 rounded-full ring-2 ring-white/10 group-hover:ring-white/40 transition-all"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate text-white group-hover:text-white transition-colors">
                  {contributor.login}
                </div>
                <div className="text-xs text-neutral-400">
                  {contributor.contributions} commits
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
