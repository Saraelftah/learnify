import RatingStars from "../RatingStars/RatingStars";
import video from "../../assets/images/video-camera (2).png";
import TeacherAvailability from "../TeacherAvailability/TeacherAvailability";
import TeacherReview from "../TeacherReview/TeacherReview";
import { NavLink } from "react-router-dom";

function TeacherDetails({ teacher }) {
  return (
    <>
      <div className="container py-30 ">
        <div className="flex flex-col items-center lg:flex-row gap-5 lg:items-stretch" data-aos="fade-down">
          {/* info */}
          <div className="lg:w-1/4 w-full rounded-2xl overflow-hidden shadow-md bg-[var(--light-background)] flex lg:flex-col">
            {/* image */}
            <div className="w-2/6 lg:w-full">
              <img src={teacher.Image} alt={teacher.name} className="h-full"/>
            </div>

            <div className= "p-4 w-4/6 lg:w-full">
              <h2 className="font-bold text-lg lg:hidden block text-center mb-2">{teacher.name}</h2>
              {/* first lesson free badge */}
              <div className="flex justify-center lg:mb-2 mb-5">
                 {teacher.firstLessonFree ? (
                <div className=" badge badge-soft bg-pink-100">
                  First Lesson Free <i className="fa-solid fa-gift"></i>
                </div>
              ) : null}
              </div>
             
              {/* hourly rate */}
              <div className="flex justify-between items-center lg:mb-2 mb-3">
                <span className="text-[var(--text-color)]">Hourly Rate:</span>
                <span className="text-[var(--dark-color)] font-bold">
                  {teacher.hourlyRate} EGP
                </span>
              </div>
              {/* lesson type */}
              <div className="flex justify-between items-center lg:mb-2  mb-3">
                <span className="text-[var(--text-color)]">Lesson Type:</span>
                <div className="flex items-end gap-2">
                  <span className="text-[var(--dark-color)] font-semibold">
                    {teacher.lessonType}
                  </span>
                  <div className="w-6">
                    <img src={video} alt="" />
                  </div>
                </div>
              </div>
              {/* rating */}
              <div className="flex justify-between items-center lg:mb-2  mb-3">
                <span className="text-[var(--text-color)] text-">Rating:</span>
                <div className="flex items-center justify-center">
                  <RatingStars value={teacher.rating} />
                  <span className="ml-2 text-[var(--dark-color)] font-semibold">
                    ({teacher.rating})
                  </span>
                </div>
              </div>
              {/* sessions */}
              <div className="flex justify-between items-center lg:mb-2  mb-3">
                <span className="text-[var(--text-color)]">Sessions:</span>
                <span className="text-[var(--dark-color)] font-bold">
                  {teacher.sessions}
                </span>
              </div>
              {/* book button */}
              <div>
                <NavLink to={`/payment/${teacher.id}`}>
                  <button className="btn btn-outline block border-[var(--secondary-color)] text-[var(--background-color)] bg-[var(--secondary-color)] mx-auto hover:bg-[var(--background-color)] hover:text-[var(--secondary-color)]">
                  book now </button>    
                </NavLink>
              </div>
            </div>

          </div>

          {/* about */}
          <div className="space-y-6 lg:w-3/4 rounded-2xl shadow-md overflow-hidden" data-aos="fade-up-left">
            <div className="hidden lg:block bg-gradient-to-r from-[var(--primary-color)] to-[var(--light-primary-color)] px-6 py-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-white text-shadow-md">
                    {teacher.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                      {teacher.subject}
                    </span>
                    <span className="text-white/80">•</span>
                    <span className="text-white/90">{teacher.gradeLevel}</span>
                    {/* <span className="text-white/80">•</span>
                  <span className="text-white/90">{teacher.lessonType}</span> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <h3 className="text-xl font-bold text-[var(--dark-color)] mb-4">
                About Me
              </h3>
              <p className="text-[var(--text-color)] leading-relaxed mb-6">
                {teacher.overview ||
                  "I am a passionate educator dedicated to helping students achieve their full potential."}
              </p>

              <TeacherAvailability
                availableDates={teacher.availableDates}
                availableGroupDates={teacher.availableGroupDates}
              />
            </div>
          </div>
        </div>

        <TeacherReview reviews={teacher.reviews} />
      </div>
    </>
  );
}

export default TeacherDetails;
