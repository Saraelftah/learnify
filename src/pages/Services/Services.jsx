import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      icon: "fa-solid fa-graduation-cap",
      title: "One-on-One Tutoring",
      description: "Personalized learning experience with dedicated tutors who adapt to your learning style and pace.",
      features: ["Customized lesson plans", "Flexible scheduling", "Progress tracking", "Direct feedback"],
      price: "From 25 Pound/hour"
    },
    {
      id: 2,
      icon: "fa-solid fa-users",
      title: "Group Classes",
      description: "Learn alongside peers in interactive group sessions that encourage collaboration and discussion.",
      features: ["Small group sizes", "Interactive learning", "Cost-effective", "Peer support"],
      price: "From 15 Pound/hour"
    },
    {
      id: 3,
      icon: "fa-solid fa-book",
      title: "Subject Specialization",
      description: "Expert tutors in various subjects including Math, Science, Languages, and more.",
      features: ["Expert knowledge", "Subject-specific methods", "Exam preparation", "Homework help"],
      price: "Varies by subject"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="services-page pt-[100px] min-h-screen bg-[var(--light-background)]">
    
      <section className="hero-section py-16 bg-gradient-to-br from-[var(--primary-color)] to-[var(--light-primary-color)] text-white">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover comprehensive learning solutions designed to meet your educational goals
          </motion.p>
        </div>
      </section>

   
      <section className="services-grid py-16">
        <div className="container mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {servicesData.map((service) => (
              <motion.div
                key={service.id}
                className="service-card bg-[var(--background-color)] rounded-[var(--border-radius)] shadow-[var(--box-shadow)] overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                variants={itemVariants}
              >
                <div className="p-8">
                  <div className="icon-wrapper mb-6 text-center">
                    <div className="w-16 h-16 mx-auto bg-[var(--light-secondary-color)] rounded-full flex items-center justify-center">
                      <i className={`${service.icon} text-3xl text-[var(--secondary-color)]`}></i>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[var(--dark-color)] mb-4 text-center">
                    {service.title}
                  </h3>
                  
                  <p className="text-[var(--text-color)] leading-[var(--line-height)] mb-6 text-center">
                    {service.description}
                  </p>
                  
                  <div className="features-list mb-6">
                    <h4 className="text-lg font-semibold text-[var(--primary-color)] mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-[var(--main-text-color)]">
                          <i className="fa-solid fa-check text-[var(--success-color)] mr-3"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="price-section text-center">
                    <span className="text-2xl font-bold text-[var(--secondary-color)]">
                      {service.price}
                    </span>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <NavLink to="/register">
                    <button className="btn bg-[var(--secondary-color)] text-white hover:bg-[var(--primary-color)] border-none shadow-none transition-colors duration-300 w-full">
                      subscribe now
                    </button>
                    </NavLink>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    
      <section className="cta-section py-16 bg-[var(--primary-color)]">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their learning experience with our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
<NavLink  to="/register">
              <button   className="btn bg-transparent text-white hover:bg-white hover:text-[var(--primary-color)] border-2 border-white text-lg px-8 py-3 transition-all duration-300">
                sign up now 
              </button>

            </NavLink>
          </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
