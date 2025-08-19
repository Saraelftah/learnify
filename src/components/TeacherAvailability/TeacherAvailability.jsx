import React from "react";
import { motion } from "framer-motion";

const TeacherAvailability = ({ teacher }) => {
  const formatTime = (time, period) => {
    return `${time} ${period}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-bold text-[var(--dark-color)] mb-4">
        Available Times
      </h2>
      
      
      {teacher.availableDates?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[var(--dark-color)] mb-3">
            Individual Lessons
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {teacher.availableDates.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--light-background)] text-[var(--primary-color)] py-3 px-4 rounded-lg text-center text-sm font-medium border border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors"
              >
                <div className="font-bold">{slot.day}</div>
                <div className="text-xs opacity-80">
                  {formatTime(slot.time, slot.period)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Group Lessons */}
      {teacher.availableGroupDates?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[var(--dark-color)] mb-3">
            Group Lessons
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {teacher.availableGroupDates.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--light-background)] text-[var(--primary-color)] py-3 px-4 rounded-lg text-center text-sm font-medium border border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors"
              >
                <div className="font-bold">{slot.day}</div>
                <div className="text-xs opacity-80">
                  {formatTime(slot.time, slot.period)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TeacherAvailability;
