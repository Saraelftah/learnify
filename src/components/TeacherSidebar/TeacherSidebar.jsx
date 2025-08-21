import React from "react";
import { motion } from "framer-motion";
import RatingStars from "../RatingStars/RatingStars";

const TeacherSidebar = ({ teacher, onBook }) => {
  const buttonHover = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  return (
    <>
      {teacher.firstLessonFree && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-md flex items-center"
        >
          <i className="fa-solid fa-gift"></i>
          First Lesson Free!
        </motion.div>
      )}

      <div className="mb-6">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          src={teacher.Image || "/default-teacher.jpg"}
          alt={teacher.name}
          className="w-full h-auto rounded-lg shadow-sm object-cover aspect-square"
        />
      </div>

      <div className="mb-6 bg-[var(--light-background)] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[var(--text-color)]">Hourly Rate:</span>
          <span className="text-[var(--dark-color)] font-bold">{teacher.hourlyRate}  EGP</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[var(--text-color)]">Lesson Type:</span>
          <span className="text-[var(--dark-color)] font-medium">{teacher.lessonType}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-color)]">Rating:</span>
          <div className="flex items-center">
            <RatingStars value={teacher.rating} />
            <span className="ml-2 text-[var(--dark-color)]">{teacher.rating}</span>
          </div>
        </div>
      </div>

      <motion.button
        variants={buttonHover}
        whileHover="hover"
        whileTap="tap"
        onClick={onBook}
        className="w-full bg-[var(--secondary-color)] text-white py-3 rounded-md font-medium hover:bg-[var(--light-secondary-color)] hover:text-[var(--secondary-color)] transition-colors mb-4"
      >
        Book This Teacher
      </motion.button>
    </>
  );
};

export default TeacherSidebar;
