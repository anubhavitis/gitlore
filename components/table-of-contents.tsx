interface Heading {
  text: string;
  level: number;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <div className="w-56 flex-shrink-0 hidden xl:block">
      <div className="sticky top-8 bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-xs mb-4 text-neutral-200 uppercase tracking-[0.2em]">
          Contents
        </h3>
        <nav className="space-y-2">
          {headings.map((heading, idx) => (
            <a
              key={idx}
              href={`#${heading.id}`}
              className="block text-sm transition-colors py-1 font-medium text-white border-l border-white pl-3 hover:text-neutral-300"
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
