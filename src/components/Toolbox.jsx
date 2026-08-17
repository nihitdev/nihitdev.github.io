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
        className="toolbox-groups"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {toolbox.map((group, groupIndex) => (
          <motion.div
            className="toolbox-group"
            key={group.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: groupIndex * 0.06 }}
          >
            <h3>{group.title}</h3>
            <div className="toolbox">
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
