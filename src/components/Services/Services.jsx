import privateImg from "../../assets/images/private.jpg";
import groupImg from "../../assets/images/group.jpg"

const Services = () => {

  return (
    <section className="services pb-[50px] capitalize overflow-x-hidden">
      <div className="">
        <div className="w-1/2 m-auto text-center mb-5">
          <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold">
            Our Services
          </h3>
          <p className="text-[var(--text-color)] leading-[var(--line-height)] py-5">
            Discover comprehensive learning solutions designed to meet your
            educational goals
          </p>
        </div>
        <div className="services-grid">
          <div className="">
            <div className="services-item grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5" data-aos="fade-right">
              <div className="col-span-1">
                <img className="rounded-[var(--border-radius)] h-full" src={privateImg} alt="private"/>
              </div>
              <div className="col-span-2 bg-[var(--light-background)] rounded-[var(--border-radius)] p-5">
                <h3 className="text-[var(--dark-color)] font-bold text-xl">private sessions</h3>
                <p className="text-[var(--text-color)] py-3">Personalized learning experience with dedicated tutors who adapt to your learning style and pace.</p>
                <ul className="features">
                  <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Private and focused environment.</li>
                  <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Direct, one-on-one attention.</li>
                  <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Flexible scheduling and location.</li>
                  <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Content tailored to your needs.</li>
                  <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Immediate feedback from instructor.</li>
                </ul>
              </div>
            </div>
            
            <div className="services-item grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5" data-aos="fade-left">
                <div className="col-span-2 bg-[var(--light-background)] rounded-[var(--border-radius)] p-5">
                  <h3 className="text-[var(--dark-color)] font-bold text-xl">group sessions</h3>
                  <p className="text-[var(--text-color)] py-3">Learn alongside peers in interactive group sessions that encourage collaboration and discussion.</p>
                  <ul className="features">
                    <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Social and collaborative learning.</li>
                    <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Motivating peer-to-peer interaction.</li>
                    <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Learn from other students' questions.</li>
                    <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Small group sizes</li>
                    <li className="flex items-center"><i className="fa-regular fa-circle-right text-[var(--success-color)] text-xl mr-2 mt-1"></i>Low cost, high value.</li>
                  </ul>
                </div>
                <div className="col-span-1">
                  <img className="rounded-[var(--border-radius)] h-full" src={groupImg} alt="group"/>
                </div>
                
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
