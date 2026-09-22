import SectionHeading from "./SectionHeading";
export default function About() {
  return (
    <section id="about" className="section shell reveal">
      <SectionHeading
        number="01"
        label="A LITTLE ABOUT ME"
        title={
          <>
            Linux is home.
            <br />
            <span>Curiosity is the default.</span>
          </>
        }
      />
      <div className="about-grid">
        <div className="about-copy">
          <p>
            I’m Nihit, a developer who likes building small things that make
            everyday workflows nicer. Shell snippets, Linux utilities,
            interactive terminal experiments, and dotfiles that feel like home.
          </p>
          <p>
            My setup changes constantly, but the goal stays the same: understand
            the tools, keep the workflow fast, and make the machine feel
            personal. Lately, that means Rust, TypeScript, Go, and a healthy
            amount of shell scripting.
          </p>
          <a className="text-link" href="#now">
            What I’m working on now <span>↗</span>
          </a>
        </div>
        <div className="setup">
          <div className="setup-heading">My daily driver</div>
          <dl>
            {[
              ["OS", "Arch Linux"],
              ["Shell", "Fish / Zsh"],
              ["Desktop", "Hyprland / Niri"],
              ["Terminal", "Kitty"],
              ["Prompt", "Starship"],
              ["Editor", "Neovim / Nano"],
            ].map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
