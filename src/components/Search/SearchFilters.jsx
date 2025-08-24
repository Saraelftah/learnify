import styles from './Search.module.css';
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchInputs({
  subjectOptions,
  gradeOptions
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [localQuery, setLocalQuery] = useState(searchParams.get("query") || "");
  const [localSubject, setLocalSubject] = useState(searchParams.get("subject") || "");
  const [localGrade, setLocalGrade] = useState(searchParams.get("grade") || "");

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (localQuery.trim() !== "") {
      params.set("query", localQuery.trim());
    }
    if (localSubject) {
      params.set("subject", localSubject);
    }
    if (localGrade) {
      params.set("grade", localGrade);
    }
    navigate(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-9 gap-5 mb-10 mt-[-70px] w-[80vw] m-auto bg-[var(--card-background)] px-5 py-7 rounded-3xl shadow-[var(--box-shadow)]"
    data-aos="fade-down"
    >
        {/* Search by name */}
        <div className="form-control md:col-span-4 relative">
          <label className="label">
            <span className="label-text text-[var(--text-color)]">
              Search by Name
            </span>
          </label>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Type teacher name..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`input w-full px-10 text-lg ${styles["search-input"]}`}
            />
          </div>
        </div>

        {/* Subject */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text  text-[var(--text-color)]">
                Subject
              </span>
            </label>
            <select
              onChange={(e) => setLocalSubject(e.target.value)}
              className={`select select-bordered w-full ${styles["dropdown"]}`}
            >
              <option value="">All</option>
              {subjectOptions?.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

        {/* Grade Level */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-[var(--text-color)]">
                Grade Level
              </span>
            </label>
            <select
              onChange={(e) => setLocalGrade(e.target.value)}
              className={`select select-bordered w-full ${styles["dropdown"]}`}
            >
              <option value="">All</option>
              {gradeOptions?.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSearch}
            type="button"
            className="btn btn-outline md:col-span-1 bg-[var(--primary-color)] text-white border-2 border-[var(--primary-color)] hover:bg-[var(--background-color)]  hover:text-[var(--primary-color)] focus:outline-none self-end"
          >
            search
          </button>
      </div>
    );
}
