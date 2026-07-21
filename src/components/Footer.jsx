import { Heart } from "lucide-react";
import GitHubMark from "./GitHubMark";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Nihit Sunhare. Built with curiosity.</p>
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">Made with <Heart size={14} className="text-blue-400" fill="currentColor" /> and too many terminal windows.</span>
          <a href="https://github.com/nihitdev" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 transition hover:text-white">
            <GitHubMark size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
