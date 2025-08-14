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
<<<<<<< HEAD
        <div className="card bg-base-100 flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
=======
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
            <figure className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                />
                {firstLessonFree && (
                    <div className="absolute top-0 left-0">
<<<<<<< HEAD
                        <span className="badge bg-[var(--primary-color)] rounded-s text-white border-none text[var()]">1st Lesson Free</span>
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
=======
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
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
                    <p className="text-[var(--stars-color)]"> <RatingStars value={rating} /> </p>
                    <p className="mt-3 font-semibold text-[var(--primary-color)]">
                        {hourlyRate != null ? `${hourlyRate} EGP / hour` : ""}
                    </p>
                </div>

<<<<<<< HEAD
                <div className="card-actions mt-4">
                    {/*  justify-around */}
                    <button
                        onClick={bookNow}
                        className="btn bg-[var(--secondary-color)] text-[var(--background-color)] hover:bg-[var(--light-secondary-color)]"
=======
                <div className="card-actions justify-between mt-4">
                    <button
                        onClick={bookNow}
                        className="btn bg-[var(--secondary-color)] text-white hover:bg-[var(--light-secondary-color)]"
>>>>>>> 44c5c17 (teacher Page with book now button to navigate to payment page)
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
