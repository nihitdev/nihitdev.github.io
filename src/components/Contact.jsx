import { useState } from "react";
import { ArrowUpRight, Copy, Check, MessageCircle } from "lucide-react";
import GitHubIcon from "./GitHubIcon";
export default function Contact() {
  const [message, setMessage] = useState("");
  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText("nihitdev");
      setMessage("Copied nihitdev — add me on Discord.");
    } catch {
      setMessage("My Discord username is nihitdev. Select and copy it here.");
    }
  }
  return (
    <section id="contact" className="section shell reveal">
      <div className="contact-card">
        <p className="eyebrow">05 / SAY HELLO</p>
        <div className="contact-heading">
          <h2>
            Good things start
            <br /> with a <span>conversation.</span>
          </h2>
          <span className="contact-asterisk" aria-hidden="true">
            ✦
          </span>
        </div>
        <p>
          Have a project in mind, a question, or a cool terminal setup?
          <br /> I’d love to hear about it.
        </p>
        <a className="email-link" href="mailto:nihitdev@proton.me">
          nihitdev@proton.me <ArrowUpRight />
        </a>
        <div className="contact-bottom">
          <a
            href="https://github.com/nihitdev"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon size={17} /> GitHub <ArrowUpRight size={14} />
          </a>
          <button onClick={copyDiscord}>
            <MessageCircle size={17} /> Discord <span>nihitdev</span>
            {message.startsWith("Copied") ? (
              <Check size={14} />
            ) : (
              <Copy size={14} />
            )}
          </button>
          <a
            href="https://github.com/nihitdev/chat/discussions"
            target="_blank"
            rel="noreferrer"
          >
            Discussions <ArrowUpRight size={14} />
          </a>
          <span className="contact-status">
            <span className="dot" /> OPEN TO A GOOD CONVERSATION
          </span>
        </div>
        <p className="copy-message" role="status">
          {message}
        </p>
      </div>
    </section>
  );
}
