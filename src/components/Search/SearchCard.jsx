

import RatingStars from "../RatingStars/RatingStars";
import BadgeFree from "../BadgeFree/BadgeFree"
import { Link } from "react-router-dom";


export default function SearchCard({ teacher }) {

    return (
      <div className="bg-[var(--card-background)] rounded-[var(--border-radius)] flex flex-col shadow-[var(--box-shadow)] hover:shadow-2xl transition-all duration-300"
      data-aos="fade-up"
      >
        <figure className="relative">
          <img
            src={teacher.Image}
            alt={teacher.name}
            className="w-full h-65 object-cover rounded-t-[var(--border-radius)]"
            loading="lazy"
          />
          <BadgeFree />
        </figure>
        <div className="p-3 pb-4">
          <h2 className="card-title text-[var(--dark-color)] pb-2">
            {teacher.name}
          </h2>

          <div className="flex flex-col  gap-2 w-full text-sm">
            <div className="flex gap-1">
              <span className="text-[var(--text-color)]">Subject:</span>
              <span className=" text-[var(--primary-color)] font-semibold">
                {teacher.subject}
              </span>
            </div>
            <div className="flex  gap-1">
              <span className="text-[var(--text-color)]">Grade:</span>
              <span className=" text-[var(--primary-color)] font-semibold">
                {teacher.gradeLevel}
              </span>
            </div>
          </div>

          <div className="mt-3 flex-column  justify-between">
            <p className="text-[var(--stars-color)]">
              <RatingStars value={teacher.rating} />
            </p>
            <p className="mt-3 font-semibold text-[var(--dark-color)]">
              {teacher.hourlyRate != null
                ? `${teacher.hourlyRate} EGP / hour`
                : ""}
            </p>
          </div>


          <div className="card-actions mt-4">
            <Link to={`/tutor/${teacher.id}`}>
              <button className="btn btn-outline block border-[var(--secondary-color)] text-[var(--secondary-color)] w-fit hover:bg-[var(--secondary-color)] hover:text-white">
                view more
              </button>
            </Link>
            <Link to={`/payment/${teacher.id}`}>
              <button className="btn btn-outline block border-[var(--secondary-color)] text-white bg-[var(--secondary-color)] w-fit hover:bg-[var(--background-color)] hover:text-[var(--secondary-color)]">
                book now
              </button>
            </Link>
          </div>

        </div>
      </div>
    );
}
