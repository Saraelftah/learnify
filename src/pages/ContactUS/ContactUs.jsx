import { useForm } from "react-hook-form";
import { db } from "../../../firebase";
import toast from "react-hot-toast";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import contactImg from "../../assets/images/contact.png";

const Contact = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const { firstName, lastName, email, subject, message } = data;
    try {
      

      await setDoc(doc(collection(db, "messages")), {
        firstName,
        lastName,
        email,
        subject,
        message,
        createdAt: serverTimestamp(),
      });

      toast.success("Message sent successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="contact-page pt-[100px] min-h-screen capitalize">
      {/* Hero Section */}

      <section className="hero-section" data-aos="fade-down">
        <div className="container mx-auto text-center py-5">
          <h3 className="text-[length:var(--title-font-size)] text-[var(--dark-color)] font-bold mb-6">Get In Touch</h3>
          <p className="text-md md:text-lg max-w-3xl mx-auto leading-relaxed text-[var(--text-color)]">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form py-10 bg-[var(--background-color)]">
        <div className="container">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-[var(--card-background)] shadow-[var(--box-shadow)] p-5 rounded-[var(--border-radius)] items-center overflow-x-hidden" data-aos="zoom-in">
          <div className="order-2 lg:order-1">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <h2 className="text-lg font-bold text-[var(--dark-color)] mb-8">

              Send us a Message
            </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[var(--dark-color)] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full p-2 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-[var(--error-color)] text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[var(--dark-color)] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full p-2 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-[var(--error-color)] text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[var(--dark-color)] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="w-full p-2 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-[var(--error-color)] text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-[var(--dark-color)] mb-1">
                  Subject
                </label>
                <select
                  {...register("subject", {
                    required: "Please select a subject",
                  })}
                  className="w-full p-2 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)]"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-[var(--error-color)] text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[var(--dark-color)] mb-1">
                  Message
                </label>
                <textarea
                  rows="6"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters long",
                    },
                  })}
                  className="w-full p-4 border border-[var(--light-primary-color)] rounded-[var(--border-radius)] focus:outline-none focus:border-[var(--primary-color)] resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
                {errors.message && (
                  <p className="text-[var(--error-color)] text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn bg-[var(--primary-color)] border-1 border-[var(--primary-color)] hover:bg-[var(--background-color)] text-white hover:text-[var(--primary-color)] shadow-none transition-all duration-300 text-lg px-8 py-4 capitalize"
                >
                  send message
                </button>
              </div>
            </form>
          </div>

          <div className="contact-img order-1 lg:order-2 lg:w-[80%] w-full justify-self-end">
              <img src={contactImg} alt="contact"/>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
