import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      reset();
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

const contactInfo = [
  {
    id: 1,
    icon: "fa-solid fa-envelope",
    title: "Email Us",
    details: "alilemorshedy10@gmail.com",
    description: "Send us an email anytime",
    link: "mailto:alilemorshedy10@gmail.com"
  },
  {
    id: 2,
    icon: "fa-solid fa-phone",
    title: "Call Us",
    details: "01067219108",
    description: "Mon To Fri from 8am to 6pm",
    link: "tel:01067219108"
  },
  {
    id: 3,
    icon: "fa-solid fa-location-dot",
    title: "Visit Us",
    details: "Mansoura, Egypt",
    description: "al-mansoura mashaia street",
  }
];


  const socialLinks = [
    { icon: "fa-brands fa-facebook", link: "#", label: "Facebook" },
    { icon: "fa-brands fa-twitter", link: "#", label: "Twitter" },
    { icon: "fa-brands fa-linkedin", link: "#", label: "LinkedIn" },
    { icon: "fa-brands fa-instagram", link: "#", label: "Instagram" }
  ];

  return (
    <div className="contact-page pt-[100px] min-h-screen bg-[var(--light-background)]">
      {/* Success Notification */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-2 py-2 rounded-lg shadow-lg flex items-center "
        >
          <div className="w-6 h-6 px-5 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-check bg-green-500 text-sm"></i>
          </div>
          <div>
            <p >Success!</p>
    
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="ml-4 text-white/80 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="hero-section py-16 bg-gradient-to-br from-[var(--primary-color)] to-[var(--light-primary-color)] text-white">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      <section className="contact-info py-16">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
{contactInfo.map((info) => (
  <div key={info.id} className="text-center">
    <a 
      href={info.link} 
      target="_blank" 
  
      className="w-20 h-20 mx-auto mb-6 bg-[var(--light-secondary-color)] rounded-full flex items-center justify-center hover:scale-110 transition-transform"
    >
      <i className={`${info.icon} text-3xl text-[var(--secondary-color)]`}></i>
    </a>
    <h3 className="text-2xl font-bold text-[var(--dark-color)] mb-3">{info.title}</h3>
    <p className="text-xl font-semibold text-[var(--primary-color)] mb-2">{info.details}</p>
    <p className="text-[var(--text-color)]">{info.description}</p>
  </div>
))}

          </motion.div>
        </div>
      </section>

   
      <section className="contact-form py-16 bg-[var(--background-color)]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--dark-color)] mb-8">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[var(--dark-color)] font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    {...register("firstName", { required: "First name is required" })}
                    className="w-full p-4 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="block text-[var(--dark-color)] font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName", { required: "Last name is required" })}
                    className="w-full p-4 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[var(--dark-color)] font-medium mb-2">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address"
                    }
                  })}
                  className="w-full p-4 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-[var(--dark-color)] font-medium mb-2">Subject</label>
                <select
                  {...register("subject", { required: "Please select a subject" })}
                  className="w-full p-4 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-[var(--dark-color)] font-medium mb-2">Message</label>
                <textarea
                  rows="6"
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 10, message: "Message must be at least 10 characters long" }
                  })}
                  className="w-full p-4 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)] resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white border-none shadow-none transition-all duration-300 text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="social-links py-16 bg-[var(--primary-color)]">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Follow Us</h2>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Contact;
