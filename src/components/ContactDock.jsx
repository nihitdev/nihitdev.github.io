import { Gamepad2, Mail, MessageCircleMore } from "lucide-react";

const contactLinks = [
  {
    label: "Chat on GitHub Discussions",
    href: "https://github.com/nihitdev/chat/discussions/1",
    icon: MessageCircleMore,
    tone: "blue",
  },
  {
    label: "Discord: nihitdev",
    href: "https://discord.com/users/1518630007323361393",
    icon: Gamepad2,
    tone: "lavender",
  },
  {
    label: "Email nihit429@gmail.com",
    href: "mailto:nihit429@gmail.com",
    icon: Mail,
    tone: "peach",
  },
];

export default function ContactDock() {
  return (
    <aside className="contact-dock" aria-label="Say hello">
      <span className="contact-dock-label">Say hello</span>
      <span className="contact-dock-divider" aria-hidden="true" />
      {contactLinks.map(({ label, href, icon: Icon, tone }) => (
        <a
          key={href}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
          className={`contact-dock-link contact-dock-link-${tone}`}
          aria-label={label}
          title={label}
        >
          <Icon size={19} aria-hidden="true" />
        </a>
      ))}
    </aside>
  );
}
