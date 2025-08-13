import { motion, AnimatePresence } from "framer-motion";
import styles from './Search.module.css';
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function SearchInputs({
    query,
    setQuery,
    subject,
    setSubject,
    gradeLevel,
    setGradeLevel,
    subjectOptions,
    gradeOptions
}) {
    const [tempQuery, setTempQuery] = useState(query);

    const handleSearch = () => {
        setQuery(tempQuery);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
            {/* Search by name */}
            <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                className="form-control md:col-span-3 relative"
            >
                <label className="label">
                    <span className="label-text font-bold text-[var(--main-text-color)]">
                        Search by Name
                    </span>
                </label>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Type teacher name..."
                        value={tempQuery}
                        onChange={(e) => {
                            const value = e.target.value;
                            setTempQuery(value);
                            if (value.trim() === "") {
                                setQuery("");
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        className={`input input-bordered w-full pr-10 text-lg ${styles["search-input"]}`}
                    />
                    <button
                        onClick={handleSearch}
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--secondary-color)] focus:outline-none"
                    >
                        <i className="fas fa-search"></i>
                    </button>
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
                        <span className="label-text font-bold text-[var(--main-text-color)]">
                            Subject
                        </span>
                    </label>
                    <motion.select
                        whileFocus={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className={`select select-bordered w-full ${styles["dropdown"]}`}
                    >
                        <option value="">All</option>
                        {subjectOptions.map((s) => (
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
                        <span className="label-text font-bold text-[var(--main-text-color)]">
                            Grade Level
                        </span>
                    </label>
                    <motion.select
                        whileFocus={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.target.value)}
                        className={`select select-bordered w-full ${styles["dropdown"]}`}
                    >
                        <option value="">All</option>
                        {gradeOptions.map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </motion.select>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
