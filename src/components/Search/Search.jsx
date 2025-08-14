import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { motion } from "framer-motion";
import SearchCard from "./SearchCard";
import SearchInputs from "./SearchFilters";
import { useSearchParams } from "react-router-dom";

function normalize(v = "") {
  return String(v).trim().toLowerCase();
}

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams(); //edit
  // const [query, setQuery] = useState("");
  // const [subject, setSubject] = useState("");
  // const [gradeLevel, setGradeLevel] = useState("");
  const query = searchParams.get("query") || "";
  const subject = searchParams.get("subject") || "";
  const gradeLevel = searchParams.get("grade") || "";

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
      const byGrade = !g || normalize(t.gradeLevel).includes(g);

      return byName && bySubject && byGrade;
    });
  }, [teachers, query, subject, gradeLevel]);

  return (
    <div>
      <SearchInputs
        // query={query}
        // setQuery={setQuery}
        // subject={subject}
        // setSubject={setSubject}
        // gradeLevel={gradeLevel}
        // setGradeLevel={setGradeLevel}
        query={query} //edit
        subject={subject} //edit
        gradeLevel={gradeLevel} //edit
        subjectOptions={subjectOptions}
        gradeOptions={gradeOptions}
        setSearchParams={setSearchParams} //edit
      />

      {loading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card bg-base-200 animate-pulse h-80" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
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
        <p className="text-center text-[var(--text-color)]">
          No teachers found.
        </p>
      )}
    </div>
  );
}
