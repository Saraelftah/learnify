import { useNavigate } from "react-router-dom";
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
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
            <figure className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                />
                {firstLessonFree && (
                    <div className="absolute top-0 left-0">
                        <span className="badge badge-success">First Lesson Free</span>
                    </div>
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title text-[var(--dark-color)]">{name}</h2>

                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="badge badge-outline">{subject}</span>
                    <span className="badge badge-outline">{gradeLevel}</span>
                </div>

                <div className="mt-3 flex-column items-center justify-between">
                    <p className="text-[var(--stars-color)]"> <RatingStars value={rating} /> </p>
                    <p className="mt-3 font-semibold text-[var(--primary-color)]">
                        {hourlyRate != null ? `${hourlyRate} EGP / hour` : ""}
                    </p>
                </div>

                <div className="card-actions justify-between mt-4">
                    <button
                        onClick={bookNow}
                        className="btn bg-[var(--secondary-color)] text-white hover:bg-[var(--light-secondary-color)]"
                    >
                        Book now
                    </button>
                    <button onClick={goToProfile} className="btn btn-outline">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
