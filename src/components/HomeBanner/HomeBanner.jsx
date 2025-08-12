import bannerImg from "../../assets/images/banner-home.png"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function HomeBanner() {
    const teachers = useSelector((state) => state.teachers.teachers);

    const subjects = teachers.map((t) => t.subject);
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0); 
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (subjects.length === 0) return;

        const currentWord = subjects[wordIndex];
        const typingSpeed =  100;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentWord.length) {
                    setText(currentWord.substring(0, charIndex + 1));
                    setCharIndex(prev => prev + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (charIndex > 0) {
                    setText(currentWord.substring(0, charIndex - 1));
                    setCharIndex(prev => prev - 1);
                } else {
                    setTimeout(() => {
                        setIsDeleting(false);
                        setWordIndex(prev => (prev + 1) % subjects.length);
                    }, 500);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, wordIndex, subjects]);

    
  return (
    <>
        {/* Banner section */}
        <section className="home__banner text-left bg-[#eaf9f9] p-[50px]">
          <div className="container">
            <div className="flex flex-col items-center lg:flex-row gap-4 ">
              <div className="w-full lg:w-1/2 p-4">
                <h1 className="text-[var(--dark-color)] !text-[50px] mb-5">
                    find the most exciting 
                    <h4 className="h-[50px] font-bold text-[var(--secondary-color)]">{text}</h4>
                    courses
                </h1>
                <p className="text-[var(--text-color)] leading-[var(--line-height)]">
                  Learn smarter, anywhere, with expert-led, hands-on lessons.
                  Master new skills with confidence and unlock opportunities for
                  your future.
                </p>
                <div className="banner-search mt-5">search component</div>
              </div>
              <div className=" w-[400px] h-[400px] lg:w-1/2  ">
                <div className="banner-img  w-[400px] h-[400px] rounded-full relative">
                  <img
                    className="w-100 object-cover"
                    src={bannerImg}
                    alt="banner"
                  />

                  <div className="chat chat-start absolute top-10 right-[-130px] opacity-90">
                    <div className="chat-bubble bg-[var(--light-secondary-color)] w-fit max-w-full whitespace-nowrap px-3 py-2">
                      <i className="fa-solid fa-heart text-[#d53232] mr-2"></i>
                      
                      Great Teacher
                    </div>
                  </div>

                  <div className="chat chat-start absolute top-40 right-[-130px] opacity-90">
                    <div className="chat-bubble bg-[var(--light-secondary-color)] w-fit max-w-full whitespace-nowrap px-3 py-2">
                      <i className="fa-solid fa-heart text-[var(--primary-color)] mr-2"></i>
                      Super Clear
                    </div>
                  </div>

                  <div className="chat chat-start absolute bottom-20 right-[-130px] opacity-90">
                    <div className="chat-bubble bg-[var(--light-secondary-color)] w-fit max-w-full whitespace-nowrap px-3 py-2">
                      <i class="fa-solid fa-lightbulb text-[var(--secondary-color)] mr-2"></i>
                      Amazing Session
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default HomeBanner