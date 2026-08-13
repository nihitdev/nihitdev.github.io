import { Globe, MessageCircle, ArrowUpRight } from "lucide-react";
import GitHubIcon from "./GitHubIcon";

export default function Contact() {
  return (
    <section id="contact" className="section shell">
      <div className="contact-card">
        <div>
          <p className="contact-kicker">05 / CONTACT</p>
          <h2>Found something cool?</h2>
          <p>Open an issue, start a discussion, or just browse the repos and steal a prompt symbol.</p>
        </div>
        <div className="contact-links">
          <a href="https://github.com/nihitdev" target="_blank" rel="noreferrer"><GitHubIcon size={18} /> GitHub <ArrowUpRight size={15}/></a>
          <a href="https://github.com/nihitdev/chat/discussions" target="_blank" rel="noreferrer"><MessageCircle size={18}/> Discussions <ArrowUpRight size={15}/></a>
          <a href="https://nihit.is-a.dev" target="_blank" rel="noreferrer"><Globe size={18}/> nihit.is-a.dev <ArrowUpRight size={15}/></a>
        </div>
      </div>
    </section>
  );
}
