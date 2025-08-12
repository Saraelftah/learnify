// import style from "./Home.module.css";
import { useEffect } from "react";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import RecommendedTeachers from "../../components/RecommendedTeachers/RecommendedTeachers";
import TeacherBenefits from "../../components/TeacherBenefits/TeacherBenefits";

import tutorImg1 from "../../assets/images/tutor-1.jpg";
import tutorImg2 from "../../assets/images/tutor-2.jpg";
import tutorImg3 from "../../assets/images/tutor-3.jpg";
import tutorImg4 from "../../assets/images/tutor-4.jpg";
import tutorImg5 from "../../assets/images/tutor-5.jpg";

function Home() {


  useEffect(() => {}, []);
  return (
    <>
      <section className="home capitalize">
        <HomeBanner />
        <div className="container">

          <RecommendedTeachers />

          {/* bcome a tutor section */}
          <section className="become-atutor shadow-[var(--box-shadow)] grid grid-cols-1 lg:grid-cols-2 gap-5 px-[20px] py-[100px] mb-[50px] rounded-[var(--border-radius)]">
            <div className="">
              <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold mb-4">Become a Tutor</h3>
              <p>Share your knowledge and inspire the next generation</p>
              <div className="teacher-benefits grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
                <TeacherBenefits iconClass="fa-solid fa-calendar-check" title="Flexible Schedule" description="Teach whenever it suits you"/>
                <TeacherBenefits iconClass="fa-solid fa-money-check-dollar" title="Earn Extra Income" description="Get paid for your expertise"/>
                <TeacherBenefits iconClass="fa-solid fa-arrow-up-right-dots" title="Professional Growth" description="Improve your teaching skills"/>
                <TeacherBenefits iconClass="fa-solid fa-computer-mouse" title="Easy Onboarding" description="Start teaching in just a few clicks"/>
              </div>
            </div>
            <div className="become-atutor-imgs  flex items-center justify-center ">
              <div className="relative flex items-center justify-center w-fit">
                <img className="!w-1/2 !h-1/2 relative z-2 border-[var(--secondary-color)] border-4"src={tutorImg1} alt="tutor"/>
                <img className="absolute !w-[150px] z-3 top-[-50px] right-[50px] border-[var(--light-primary-color)] border-4 rotate-60" src={tutorImg2} alt="tutor"/>
                <img className="absolute !w-[150px] z-1 bottom-[-50px] right-[40px] border-[var(--light-primary-color)] border-4 rotate-45" src={tutorImg3} alt="tutor"/>
                <img className="absolute !w-[150px] z-1 top-[-50px] left-[40px] border-[var(--light-primary-color)] border-4 -rotate-45" src={tutorImg4} alt="tutor"/>
                <img className="absolute !w-[150px] z-3 bottom-[-50px] left-[40px] border-[var(--light-primary-color)] border-4 rotate-45" src={tutorImg5} alt="tutor"/>
              </div>
              
              
            </div>
          </section>


        </div>
        
      </section>
    
    </>
  );
}

export default Home;

