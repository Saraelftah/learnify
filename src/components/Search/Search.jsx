import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import SearchCard from "./SearchCard";
import styles from './Search.module.css'

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function normalize(v = "") {
  return String(v).trim().toLowerCase();
}

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);


  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");


  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "teachers"));
        const rows = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: data.name || "",
            subject: data.subject || "",
            gradeLevel: data.gradeLevel || "",
            rating: data.rating ?? null,
            hourlyRate: data.hourlyRate ?? null,
            firstLessonFree: !!data.firstLessonFree,
            image: data.Image || "",
          };
        });
        setTeachers(rows);
      } catch (e) {
        console.error("Failed to fetch teachers", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const subjectOptions = useMemo(() => {
    const set = new Map();
    teachers.forEach((t) => {
      const key = normalize(t.subject);
      if (key) set.set(key, t.subject); 
    });
    return Array.from(set.values()).sort((a, b) => a.localeCompare(b));
  }, [teachers]);

  const gradeOptions = useMemo(() => {
    const set = new Map();
    teachers.forEach((t) => {
      const key = normalize(t.gradeLevel);
      if (key) set.set(key, t.gradeLevel);
    });
    return Array.from(set.values()).sort((a, b) => a.localeCompare(b));
  }, [teachers]);


  const filtered = useMemo(() => {
    const q = normalize(query);
    const s = normalize(subject);
    const g = normalize(gradeLevel);

    return teachers.filter((t) => {
      const byName = !q || normalize(t.name).includes(q);
      const bySubject = !s || normalize(t.subject) === s; 
      
      const byGrade =
        !g || normalize(t.gradeLevel).includes(g);

      return byName && bySubject && byGrade;
    });
  }, [teachers, query, subject, gradeLevel]);

  return (
    <div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Search by name */}
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          className="form-control"
        >
          <label className="label">
            <span className="label-text font-bold text-[var(--main-text-color)]">
              Search by Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Type teacher name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`input input-bordered w-full ${styles["search-input"]}`}
          />
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
              className={`select select-bordered w-full ${styles["search-input"]}`}
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
              className={`select select-bordered w-full ${styles["search-input"]}`}
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

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card bg-base-200 animate-pulse h-80" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <SearchCard teacher={t} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-[var(--text-color)]">No teachers found.</p>
      )}
    </div>
  );
}
