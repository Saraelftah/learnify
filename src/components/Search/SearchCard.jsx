import { NavLink, useNavigate } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";

export default function SearchCard({ teacher }) {
    const navigate = useNavigate();
    const {
        id,
        name,
        subject,
        gradeLevel,
        rating,
        hourlyRate,
        firstLessonFree,
        image,
    } = teacher;

    const goToProfile = () => navigate(`/teachers/${id}`);
    const bookNow = () => navigate(`/checkout/${id}`);

    return (
        <div className="card bg-base-100 flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
            <figure className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                />
                {firstLessonFree && (
                    <div className="absolute top-0 left-0">
                        <span className="badge bg-[var(--stars-color)] rounded-s text-white border-none text[var(--background-color)]">1st Lesson Free</span>
                    </div>
                )}
            </figure>
            <div className="card-body bg-[var(--background-color)] flex flex-col justify-between">
                {/* item-center */}
                <h2 className="card-title text-[var(--dark-color)]">{name}</h2>

                <div className="flex flex-col  gap-2 w-full text-sm">
                    {/* items-center */}
                    <div className="flex gap-1">
                        {/* items-center */}
                        <span className="font-semibold">Subject:</span>
                        <span className="indicator indicator-start indicator-primary px-2 rounded  text-[var(--text-color)]">{subject}</span>
                        {/* bg-[var(--light-secondary-color)] */}
                    </div>
                    <div className="flex  gap-1">
                        {/* items-center */}
                        <span className="font-semibold">Grade:</span>
                        <span className="indicator indicator-start indicator-secondary px-2 rounded text-[var(--text-color)]">{gradeLevel}</span>
                        {/* bg-[var(--light-primary-color)] */}
                    </div>
                </div>

                <div className="mt-3 flex-column  justify-between">
                    {/* items-center */}
                    <p className="text-[var(--stars-color)]"> <RatingStars value={rating} /> </p>
                    <p className="mt-3 font-semibold text-[var(--primary-color)]">
                        {hourlyRate != null ? `${hourlyRate} EGP / hour` : ""}
                    </p>
                </div>

                <div className="card-actions mt-4">
                    {/*  justify-around */}
                    <NavLink to={`/payment/${teacher.id}`}>
                    <button
                        onClick={bookNow}
                        className="btn bg-[var(--secondary-color)] text-[var(--background-color)] hover:bg-[var(--background-color)] hover:text-[var(--secondary-color)] hover:border-[var(--secondary-color)]"
                    >
                        Book now
                    </button>
                    </NavLink>

                    <NavLink to={`/tutor/${teacher.id}`}>
                    <button onClick={goToProfile} className="btn btn-outline border-[var(--secondary-color)] text-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-[var(--background-color)]">
                        View Profile
                    </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
