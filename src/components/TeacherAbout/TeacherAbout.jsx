import React from "react";
import { motion } from "framer-motion";

const TeacherAbout = ({ teacher }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-bold text-[var(--dark-color)] mb-4">
        About Me
      </h2>
      <p className="text-[var(--text-color)] leading-relaxed">
        {teacher.overview ||
          "I am a passionate educator dedicated to helping students achieve their full potential."}
      </p>
    </motion.div>
  );
};

export default TeacherAbout;
