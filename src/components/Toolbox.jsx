import { motion } from "motion/react";
import { toolbox } from "../data/portfolio";

export default function Toolbox() {
  return (
    <section id="toolbox" className="section shell">
      <div className="section-head">
        <p>02 / TOOLBOX</p>
        <h2>The giant toolbox survived.</h2>
      </div>
      <motion.div
        className="toolbox"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {toolbox.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.025, 0.35) }}
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
