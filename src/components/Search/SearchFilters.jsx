import { motion, AnimatePresence } from "framer-motion";
import styles from './Search.module.css';
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, useSearchParams } from "react-router-dom"; //edit
const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function SearchInputs({
    // query,
    // setQuery,
    // subject,
    // setSubject,
    // gradeLevel,
    // setGradeLevel,
    subjectOptions,
    gradeOptions
}) {

    // const [tempQuery, setTempQuery] = useState(query);

    //edit
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const subject = searchParams.get("subject") || "";
    const gradeLevel = searchParams.get("grade") || "";
    const navigate = useNavigate(); //edit



    const handleSearch = () => {
      //edit
      const params = new URLSearchParams();

      if (query.trim() !== "") {
        params.set("query", query.trim());
      }
      if (subject) {
        params.set("subject", subject);
      }
      if (gradeLevel) {
        params.set("grade", gradeLevel);
      }
      // setQuery(tempQuery);
      navigate(`/search?${params.toString()}`); //edit
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
            
        }
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-10">
        {/* Search by name */}
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          className="form-control md:col-span-3 relative"
        >
          <label className="label">
            <span className="label-text font-bold text-[var(--text-color)]">
              Search by Name
            </span>
          </label>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Type teacher name..."
              value={query}
              onChange={(e) => {
                const newSearchParams = new URLSearchParams(searchParams);
                if (e.target.value.trim() !== "") {
                  newSearchParams.set("query", e.target.value);
                } else {
                  newSearchParams.delete("query");
                }
                setSearchParams(newSearchParams);
              }}
              onKeyDown={handleKeyDown}
              className={`input input-bordered w-full pr-10 text-lg ${styles["search-input"]}`}
            />
          </div>
        </motion.div>

        {/* Subject */}
        <AnimatePresence>
          <motion.div
            key="subject"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ delay: 0.08 }}
            className="form-control"
          >
            <label className="label">
              <span className="label-text font-bold text-[var(--text-color)]">
                Subject
              </span>
            </label>
            <motion.select
              whileFocus={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              value={subject}
              onChange={(e) => {
                const newSearchParams = new URLSearchParams(searchParams);
                if (e.target.value) {
                  newSearchParams.set("subject", e.target.value);
                } else {
                  newSearchParams.delete("subject");
                }
                setSearchParams(newSearchParams);
              }}
              className={`select select-bordered w-full ${styles["dropdown"]}`}
            >
              <option value="">All</option>
              {subjectOptions?.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </motion.select>
          </motion.div>
        </AnimatePresence>

        {/* Grade Level */}
        <AnimatePresence>
          <motion.div
            key="grade"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ delay: 0.16 }}
            className="form-control"
          >
            <label className="label">
              <span className="label-text font-bold text-[var(--text-color)]">
                Grade Level
              </span>
            </label>
            <motion.select
              whileFocus={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              value={gradeLevel}
              onChange={(e) => {
                const newSearchParams = new URLSearchParams(searchParams);
                if (e.target.value) {
                  newSearchParams.set("grade", e.target.value);
                } else {
                  newSearchParams.delete("grade");
                }
                setSearchParams(newSearchParams);
              }}
              className={`select select-bordered w-full ${styles["dropdown"]}`}
            >
              <option value="">All</option>
              {gradeOptions?.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </motion.select>
          </motion.div>

          <button
            onClick={handleSearch}
            type="button"
            className="btn btn-outline bg-[var(--primary-color)] text-[var(--background-color)] border-2 border-[var(--primary-color)] hover:bg-[var(--background-color)]  hover:text-[var(--primary-color)] focus:outline-none self-end"
          >
            search
          </button>
        </AnimatePresence>
      </div>
    );
}
