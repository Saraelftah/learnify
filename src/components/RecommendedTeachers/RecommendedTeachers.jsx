import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import "./RecommendedTeachers.module.css";
import RatingStars from "../RatingStars/RatingStars";
import { NavLink } from "react-router-dom";

function RecommendedTeachers() {
  const teachers = useSelector((state) => state.teachers.teachers);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="recommended-teachers py-[50px]">
        <h3 className="text-[var(--dark-color)] font-bold mb-5 text-[length:var(--title-font-size)]">recommended teachers</h3>
        <Carousel
          responsive={responsive}
          itemClass="px-2"
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          customTransition="all .5"
          transitionDuration={500}
        >
          {teachers
            .filter((teacher) => teacher.rating > 4)
            .map((teacher) => (
              <div
                key={teacher.id}
                className="teacher-card p-4 rounded-[var(--border-radius)] border-[var(--light-primary-color)] border-1 flex flex-col items-center"
              >
                <img
                  className="rounded-full !w-50 mb-5"
                  src={teacher.Image}
                  alt={teacher.name}
                />
                <h3 className="text-[var(--primary-color)]  font-bold">
                  {teacher.name}
                </h3>
                <p>{teacher.subject}</p>
                <span>
                  <RatingStars value={teacher.rating} />
                </span>
                
                <NavLink
                  to="/"
                  className="btn border-[var(--secondary-color)] bg-white text-[var(--secondary-color)] w-fit"
                >
                  view more
                </NavLink>
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
}

export default RecommendedTeachers;
