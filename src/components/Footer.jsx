import { ArrowUp } from "lucide-react";
export default function Footer() {
  return (
    <footer className="footer shell">
      <a href="https://nihit.is-a.dev" className="footer-brand">
        nihitdev<span className="accent">.</span>
      </a>
      <span>© {new Date().getFullYear()} Nihit Sunhare</span>
      <span>Made with care. Built on Linux.</span>
      <a href="#home" aria-label="Back to top">
        <span>cd ~</span>
        <ArrowUp size={14} />
      </a>
    </footer>
  );
}
