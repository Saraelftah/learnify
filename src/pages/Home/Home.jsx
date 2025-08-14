// import style from "./Home.module.css";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import RecommendedTeachers from "../../components/RecommendedTeachers/RecommendedTeachers";
import TeacherBenefits from "../../components/TeacherBenefits/TeacherBenefits";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RatingStars from "../../components/RatingStars/RatingStars";
import FeaturesCard from "../../components/FeaturesCard/FeaturesCard";

import tutorImg1 from "../../assets/images/tutor-1.jpg";
import tutorImg2 from "../../assets/images/tutor-2.jpg";
import tutorImg3 from "../../assets/images/tutor-3.jpg";
import tutorImg4 from "../../assets/images/tutor-4.jpg";
import tutorImg5 from "../../assets/images/tutor-5.jpg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";




function Home() {
    const teachers = useSelector((state) => state.teachers.teachers);
    const [currentSlide, setCurrentSlide] = useState(0);

    const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  }

  // arrows for review section
  const CustomButtonGroup = ({ next, previous }) => (
    <div className="flex justify-center gap-5 mt-5">
        <button
            onClick={previous}
            className="btn btn-circle btn-outline p-3 border-2 border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white transition-colors"
        >
            <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
            onClick={next}
            className="btn btn-circle btn-outline p-3 border-2 border-[var(--secondary-color)] bg-[var(--background-color)] text-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white transition-colors"
        >
            <i className="fa-solid fa-chevron-right"></i>
        </button>
    </div>
);
  

  useEffect
  return (
    <>
      <section className="home capitalize pt-[100px]">
        <HomeBanner />
        <div className="container">
          <section className="why-learnify py-[50px]">
              <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)]">Why Choose Us?</h3>
              <p className="text-[var(--text-color)] leading-[var(--line-height)] py-5">Learn from top-qualified tutors at your convenience. Book private or group lessons, enjoy flexible schedules, and experience interactive online classes — all in one platform.</p>
              <div className="features grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeaturesCard iconClass="fa-regular fa-calendar-check" description="Easy Lesson Booking"/>
                <FeaturesCard iconClass="fa-regular fa-star" description="Qualified Teachers"/>
                <FeaturesCard iconClass="fa-regular fa-alarm-clock" description="Flexible Scheduling"/>
                <FeaturesCard iconClass="fa-regular fa-money-bill-1" description="Affordable Packages"/>
                <FeaturesCard iconClass="fa-regular fa-hand" description="Interactive Online Classes"/>
                <FeaturesCard iconClass="fa-regular fa-address-book" description="Variety of Subjects"/>

              </div>
          </section>
          <RecommendedTeachers />
        </div>
          {/* bcome a tutor section */}
          <section className="become-atutor !bg-[var(--light-background)] grid grid-cols-1 lg:grid-cols-2 gap-5 px-[20px] py-[100px] mb-[50px] rounded-[var(--border-radius)]">
            <div className="container">
              <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold mb-4">Become a Tutor</h3>
              <p>Share your knowledge and inspire the next generation</p>
              <div className="teacher-benefits grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
                <TeacherBenefits iconClass="fa-solid fa-calendar-check" title="Flexible Schedule" description="Teach whenever it suits you"/>
                <TeacherBenefits iconClass="fa-solid fa-money-check-dollar" title="Earn Extra Income" description="Get paid for your expertise"/>
                <TeacherBenefits iconClass="fa-solid fa-arrow-up-right-dots" title="Professional Growth" description="Improve your teaching skills"/>
                <TeacherBenefits iconClass="fa-solid fa-computer-mouse" title="Easy Onboarding" description="Start teaching in just a few clicks"/>
              </div>
            </div>
            <div className="become-atutor-imgs  flex items-center">
              <div className="relative flex items-center justify-start lg:justify-center w-fit">
                <img className="lg:!w-1/2 !w-100 relative  z-2 border-none lg:border-white border-4"src={tutorImg1} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-3 top-[-50px] right-[50px] border-[var(--light-primary-color)] border-4 rotate-60" src={tutorImg2} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-1 bottom-[-50px] right-[40px] border-[var(--light-primary-color)] border-4 rotate-45" src={tutorImg3} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-1 top-[-50px] left-[40px] border-[var(--light-primary-color)] border-4 -rotate-45" src={tutorImg4} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-3 bottom-[-50px] left-[40px] border-[var(--light-primary-color)] border-4 rotate-45" src={tutorImg5} alt="tutor"/>
              </div> 
            </div>
            <NavLink to="/register">
            <button className="btn btn-outline block border-[var(--secondary-color)] text-[var(--secondary-color)] w-fit hover:bg-[var(--secondary-color)] hover:text-white"> sign up now</button>
            </NavLink>
          </section>
      </section>


      {/* reviews section */}
      <section className="reviews my-[50px] py-[50px] relative">
        <div className="container">
        <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] capitalize mb-2">testiomonials</h3>
        <p>what students say about us?</p>
        <Carousel
        responsive={responsive}
        itemClass="px-2"
        arrows={false}
        showDots={false}
        containerClass="carousel-container py-15"
        afterChange={(previousSlide, { currentSlide }) => setCurrentSlide(currentSlide)}
        customButtonGroup={<CustomButtonGroup />}
        renderButtonGroupOutside={true}
        >
        {teachers?.map((item, i) => {
        const isCenter = i === currentSlide + Math.floor(responsive.desktop.items / 2);


        return(
          <div 
            key={item.id}
            className={` shadow-[var(--box-shadow)] !h-full rounded-[var(--border-radius)] p-5 text-center items-stretch transition-all duration-300 
            ${isCenter ? "scale-y-120 border-2 border-[var(--secondary-color)] shadow-lg" : "scale-95 opacity-80"} `} >
            <i className="fa-solid fa-quote-right text-4xl items-end text-[var(--light-primary-color)] mb-2"></i>
            <div className="flex items-center justify-center">
              <div>
                <h4 className="text-[var(--dark-color)]">{item.reviews[0].studentName}</h4>
                <p className="leading-[var(--line-height] my-2">{item.reviews[0].comment}</p>
                <RatingStars value={item.reviews[0].rating}/>
              </div>
            </div>
          </div>
        )})}
        
        
      </Carousel>
      </div>
      </section>
    
    </>
  );
}

export default Home;

