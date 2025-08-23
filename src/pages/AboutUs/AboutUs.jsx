
import visionImg from "../../assets/images/vision.jpg";

export default function AboutUs() {
  return (
    <div className="about mt-[100px] mb-[50px]">
      <div className="container">
        {/* Title */}
        <h3 className="font-bold py-5 text-center text-[var(--dark-color)] text-[length:var(--title-font-size)]" data-aos="fade-down">
          About us
        </h3>

        {/* Main Description */}
        <p className="text-md md:text-lg text-center lg:w-[60vw] w-full mx-auto leading-relaxed mb-16 text-[var(--text-color)] " data-aos="fade-down">
          Learnify is an online learning platform that connects students with
          qualified teachers for personalized lessons. Whether one-on-one or in
          groups, students can easily book online sessions, manage schedules,
          and pay securely.
        </p>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-10" data-aos="fade-up">
          {[
            {
              title: "Easy Booking",
              desc: "Students can browse teachers, check availability, and book lessons instantly.",
              icon: "fa-calendar-check",
            },
            {
              title: "Seamless Communication",
              desc: "Integrated chat and video calls to make learning smooth and interactive.",
              icon: "fa-comments",
            },
            {
              title: "Smart Tools",
              desc: "Teachers can manage schedules, track student progress, and grow their business.",
              icon: "fa-chalkboard-teacher",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[var(--light-background)] shadow-[var(--box-shadow)] rounded-[var(--border-radius)] p-8 transition-transform transform hover:scale-102 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                <i
                  className={`fas ${item.icon} text-4xl text-[var(--secondary-color)]`}
                ></i>
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-[var(--dark-color)]">
                {item.title}
              </h3>
              <p className="text-center text-[var(--text-color)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Vision */}
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-10 mt-20 overflow-x-hidden">
          <div className="vision-img" data-aos="fade-right">
            <img className="rounded-[var(--border-radius)]" src={visionImg} alt="vision" />
          </div>

          <div data-aos="fade-left">
            <h3 className="text-3xl font-extrabold mb-6 text-[var(--dark-color)] text-[length:var(--title-font-size)]">
              Our Vision
            </h3>
            <p className="text-lg leading-[var(line-height)] text-[var(--text-color)]">
              At Learnify, we believe that education should be flexible,
              affordable, and accessible. Our mission is to empower students to
              achieve their goals while providing teachers with the tools they
              need to succeed in the digital era.
            </p>
            <div className="mt-8">
                <div className="flex items-start mb-3 text-[var(--text-color)]">
                    <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
                    Building a Global Learning Community
                </div>
                <div className="flex items-start mb-3 text-[var(--text-color)]">
                    <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
                    Diverse Learning Resources
                </div>
                <div className="flex items-start mb-3 text-[var(--text-color)]">
                    <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
                    Interactive & Engaging
                </div>
                <div className="flex items-start mb-3 text-[var(--text-color)]">
                    <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
                    Safe & Supportive Environment
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
