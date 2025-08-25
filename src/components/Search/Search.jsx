import { useMemo } from "react";
import { useSelector } from "react-redux";
import SearchCard from "./SearchCard";
import SearchInputs from "./SearchFilters";
import { useSearchParams } from "react-router-dom";
import noresults from "../../assets/images/no-results.png";

function normalize(v = "") {
  return String(v).trim().toLowerCase();
}

export default function Search() {
  const teachers = useSelector((state) => state.teachers.teachers);
  const loading = useSelector((state) => state.teachers.status) === "loading";

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const subject = searchParams.get("subject") || "";
  const gradeLevel = searchParams.get("grade") || "";

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
        query={query}
        subject={subject}
        gradeLevel={gradeLevel}
        subjectOptions={subjectOptions}
        gradeOptions={gradeOptions}
        setSearchParams={setSearchParams}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card bg-base-200 animate-pulse h-80" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((t) => (
            <div key={t.id}>
              <SearchCard teacher={t} />
            </div>
          ))}
        </div>
      ) : (
        <div data-aos="zoom-in-up">
          <div className="w-30 md:w-50 mx-auto">
            <img src={noresults} alt="" />
          </div>
          <p className="text-center text-[var(--text-color)] mt-2 text-xl font-bold">
            No teachers found.
          </p>
        </div>
      )}
    </div>
  );
}
