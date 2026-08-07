import { motion } from "motion/react";
import { ArrowRight, MessageCircleMore, Sparkles } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-shell py-24 sm:py-32">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-[#cba6f7]/25 bg-[#181825]/85 px-6 py-16 text-center shadow-[0_35px_120px_rgba(17,17,27,0.62)] backdrop-blur-2xl sm:px-12 sm:py-24"
        initial={{ opacity: 0, y: 38 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(203,166,247,0.1),transparent_48%)]" />
        <div className="absolute -left-24 bottom-[-8rem] h-72 w-72 rounded-full bg-[#89b4fa]/10 blur-3xl" />
        <div className="absolute -right-24 top-[-8rem] h-72 w-72 rounded-full bg-[#cba6f7]/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <span className="mx-auto mb-7 grid h-14 w-14 place-items-center rounded-2xl border border-[#cba6f7]/30 bg-[#cba6f7]/15 text-[#cba6f7] shadow-lg shadow-[#11111b]/40">
            <Sparkles size={25} />
          </span>
          <p className="section-kicker">LET&apos;S MAKE SOMETHING USEFUL</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">Have an idea worth building?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Whether it&apos;s a developer tool, an open-source experiment, or a delightfully specific terminal idea, I&apos;d like to hear about it.
          </p>
          <a
            href="https://github.com/nihitdev/chat/discussions/1"
            target="_blank"
            rel="noreferrer"
            className="primary-button mt-9"
          >
            <MessageCircleMore size={20} /> Start a conversation <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
