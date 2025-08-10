import { useEffect } from "react";
import bannerImg from "../../assets/images/banner-home.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLightbulb, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
// import { useSelector } from "react-redux";
// import style from "./Home.module.css";
function Home() {
  // const useDispatch = useDispatch();
    // const teachers = useSelector((state) => state.teachers.teachers);

  useEffect(() => {}, []);
  return (
    <>
      <section className="home capitalize">
        {/* Banner section */}
        <section className="home__banner text-left bg-[#eaf9f9] p-[50px]">
          <div className="container">
            <div className="flex flex-col items-center lg:flex-row gap-4 ">
              <div className="w-full lg:w-1/2 p-4">
                <h1 className="text-[var(--dark-color)] !text-[50px] mb-5">
                  find the most exciting online courses
                </h1>
                <p className="text-[var(--text-color)] leading-[var(--line-height)]">
                  Learn smarter, anywhere, with expert-led, hands-on lessons.
                  Master new skills with confidence and unlock opportunities for
                  your future.
                </p>
                <div className="banner-search mt-5">search component</div>
              </div>
              <div className=" w-[400px] h-[400px] lg:w-1/2  relative">
                <div className="banner-img  w-[400px] h-[400px] rounded-full border-[20px] border-[var(--light-primary-color)] overflow-hidden">
                  <img
                    className="w-100 object-cover"
                    src={bannerImg}
                    alt="banner"
                  />

                  <div className="chat chat-start absolute top-10 right-10 opacity-90">
                    <div className="chat-bubble bg-[var(--light-secondary-color)] w-fit max-w-full whitespace-nowrap px-3 py-2">
                      <FontAwesomeIcon
                        className="text-[#d53232] mr-2"
                        icon={faHeart}
                      />
                      Great Teacher
                    </div>
                  </div>

                  <div className="chat chat-start absolute top-40 right-4 opacity-90">
                    <div className="chat-bubble bg-[var(--light-secondary-color)] w-fit max-w-full whitespace-nowrap px-3 py-2">
                      <FontAwesomeIcon
                        className="text-[var(--primary-color)] mr-2"
                        icon={faThumbsUp}
                      />
                      Super Clear
                    </div>
                  </div>

                  <div className="chat chat-start absolute bottom-20 right-4 opacity-90">
                    <div className="chat-bubble bg-[var(--light-secondary-color)] w-fit max-w-full whitespace-nowrap px-3 py-2">
                      <FontAwesomeIcon
                        className="text-[var(--secondary-color)] mr-2"
                        icon={faLightbulb}
                      />
                      Amazing Session
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* {teachers.map((t) => (
          <p key={t.id}>{t.name}</p>
        ))} */}
    </>
  );
}

export default Home;

