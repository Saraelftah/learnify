import React from "react";
import { motion } from "framer-motion";

const TeacherHeader = ({ teacher }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--light-primary-color)] px-6 py-6 text-white mt-16"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {teacher.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
              {teacher.subject}
            </span>
            <span className="text-white/80">•</span>
            <span className="text-white/90">{teacher.gradeLevel}</span>
            <span className="text-white/80">•</span>
            <span className="text-white/90">{teacher.lessonType}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherHeader;