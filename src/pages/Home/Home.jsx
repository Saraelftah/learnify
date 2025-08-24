// import style from "./Home.module.css";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import RecommendedTeachers from "../../components/RecommendedTeachers/RecommendedTeachers";
import TeacherBenefits from "../../components/TeacherBenefits/TeacherBenefits";
import "react-multi-carousel/lib/styles.css";
import FeaturesCard from "../../components/FeaturesCard/FeaturesCard";
import HomeReview from "../../components/HomeReview/HomeReview";
import Services from "../../components/Services/Services";

import tutorImg1 from "../../assets/images/tutor-1.jpg";
import tutorImg2 from "../../assets/images/tutor-2.jpg";
import tutorImg3 from "../../assets/images/tutor-3.jpg";
import tutorImg4 from "../../assets/images/tutor-4.jpg";
import tutorImg5 from "../../assets/images/tutor-5.jpg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";




function Home() {

  const teachers = useSelector((state) => state.teachers.teachers);
  
  return (
    <>
      <section className="home capitalize pt-[100px]">
        <HomeBanner />

        <div className="container">
          {/* why us section */}
          <section className="why-learnify py-[50px]" data-aos="fade-up" >
              <div className="w-1/2 m-auto text-center mb-5">
                <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold">Why Choose Us?</h3>
                <p className="text-[var(--text-color)] leading-[var(--line-height)] py-5">Learn from top-qualified tutors at your convenience. Book private or group lessons, enjoy flexible schedules, and experience interactive online classes — all in one platform.</p>
              </div>
              
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
          <Services />
          
        </div>
        {/* reviews section */}
        <HomeReview teachers={teachers} />
          {/* bcome a tutor section */}
          <section className="become-atutor !bg-[var(--light-background)] py-[100px] overflow-x-hidden mb-[50px]"
            
          >
            <div className="container">
              <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold mb-4">Become a Tutor</h3>
              <p>Share your knowledge and inspire the next generation</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  mb-[50px] rounded-[var(--border-radius)]">
              
              <div className="teacher-benefits grid grid-cols-1 lg:grid-cols-2 gap-5 my-5" data-aos="fade-down-right">
                <TeacherBenefits iconClass="fa-solid fa-calendar-check" title="Flexible Schedule" description="Teach whenever it suits you"/>
                <TeacherBenefits iconClass="fa-solid fa-money-check-dollar" title="Earn Extra Income" description="Get paid for your expertise"/>
                <TeacherBenefits iconClass="fa-solid fa-arrow-up-right-dots" title="Professional Growth" description="Improve your teaching skills"/>
                <TeacherBenefits iconClass="fa-solid fa-computer-mouse" title="Easy Onboarding" description="Start teaching in just a few clicks"/>
              </div>
            
            <div className="become-atutor-imgs  flex items-center"
              
            >
              <div className="relative flex items-center justify-start lg:justify-center w-fit" data-aos="fade-down-left">
                <img className="lg:!w-1/2 !w-100 relative  z-2 border-none lg:border-white border-4"src={tutorImg1} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-3 top-[-50px] right-[50px] border-[var(--light-primary-color)] border-4 rotate-60" src={tutorImg2} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-1 bottom-[-50px] right-[40px] border-[var(--light-primary-color)] border-4 rotate-45" src={tutorImg3} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-1 top-[-50px] left-[40px] border-[var(--light-primary-color)] border-4 -rotate-45" src={tutorImg4} alt="tutor"/>
                <img className="absolute hidden lg:block !w-[150px] z-3 bottom-[-50px] left-[40px] border-[var(--light-primary-color)] border-4 rotate-45" src={tutorImg5} alt="tutor"/>
              </div> 
            </div>
            <NavLink to="/role" className="flex justify-start items-center">
            <button className="btn btn-outline block border-[var(--secondary-color)] text-white bg-[var(--secondary-color)] w-fit hover:bg-[var(--background-color)] px-10  hover:text-[var(--secondary-color)]">join us</button>
            </NavLink>
            </div>
            </div>
          </section>
      </section>


      
    
    </>
  );
}

export default Home;

