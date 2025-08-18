import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import RatingStars from "../../components/RatingStars/RatingStars";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./TeacherProfile.module.css";

function TeacherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, loadingAuth] = useAuthState(auth);
  const teachers = useSelector((state) => state.teachers.teachers);
  const [teacher, setTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (teachers.length > 0 && id) {
      const foundTeacher = teachers.find((t) => t.id === id);
      if (foundTeacher) {
        setTeacher(foundTeacher);
        setEditForm({
          name: foundTeacher.name,
          overview: foundTeacher.overview,
          subject: foundTeacher.subject,
          gradeLevel: foundTeacher.gradeLevel,
          hourlyRate: foundTeacher.hourlyRate,
        });
      }
    }
  }, [teachers, id]);

  useEffect(() => {
    if (user && teacher) {
      const checkEditPermission = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userRole = userDoc.data().role;
            const canEditProfile =
              userRole === "admin" ||
              (userRole === "teacher" && teacher.ownerId === user.uid);
            setCanEdit(canEditProfile);
          }
        } catch (error) {
          console.error("Error checking edit permission:", error);
          setCanEdit(false);
        }
      };
      checkEditPermission();
    }
  }, [user, teacher]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const teacherRef = doc(db, "teachers", id);
      await updateDoc(teacherRef, {
        name: editForm.name,
        overview: editForm.overview,
        subject: editForm.subject,
        gradeLevel: editForm.gradeLevel,
        hourlyRate: Number(editForm.hourlyRate),
      });

      setTeacher((prev) => ({
        ...prev,
        ...editForm,
        hourlyRate: Number(editForm.hourlyRate),
      }));

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating teacher profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: teacher.name,
      overview: teacher.overview,
      subject: teacher.subject,
      gradeLevel: teacher.gradeLevel,
      hourlyRate: teacher.hourlyRate,
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNow = () => navigate(`/payment/${id}`);

  if (!teacher) {
    return <Loader />;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const buttonHover = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  };

  // Carousel settings
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[var(--light-background)] py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto bg-[var(--background-color)] rounded-lg shadow-md overflow-hidden "
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--light-background)] px-6 py-4 text-white mt-16"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-2 transition-all duration-300 hover:translate-x-1">
              <h1 className="text-3xl font-bold text-[var(--dark-color)] transition-colors">
                {teacher.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-[var(--light-primary-color)] text-[var(--secondary-color)] rounded-full text-1xl fs-3">
                  {teacher.gradeLevel}
                </span>
                <span className="text-[var(--text-secondary)]">•</span>
                <span className="text-[var(--text-color)]">
                  {teacher.subject} Teacher
                </span>
              </div>
            </div>
            {!isEditing && canEdit && (
              <motion.button
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
                onClick={handleEdit}
                className="px-4 py-2 bg-[var(--secondary-color)] text-white rounded-md font-medium hover:bg-[var(--light-secondary-color)] hover:text-[var(--success-color)] transition-colors"
              >
                Edit Profile
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="md:flex">
          {/* Left Column - Image and Booking */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:w-1/3 p-6 border-r border-[var(--primary-color)] relative"
          >
            {/* First Lesson Free Badge */}
            {teacher.firstLessonFree && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-md flex items-center"
              >
                First Lesson Free!
              </motion.div>
            )}

            <div className="mb-6">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                src={teacher.Image || "/default-teacher.jpg"}
                alt={teacher.name}
                className="w-full h-auto rounded-lg shadow-sm object-cover aspect-square"
              />
            </div>

            <div className="mb-6 bg-[var(--light-background)] p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[var(--text-color)]">Hourly Rate:</span>
                <span className="text-[var(--dark-color)] font-bold">
                  ${teacher.hourlyRate}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[var(--text-color)]">Lesson Type:</span>
                <span className="text-[var(--dark-color)] font-medium">
                  {teacher.lessonType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-color)]">Rating:</span>
                <div className="flex items-center">
                  <RatingStars value={teacher.rating} />
                  <span className="ml-2 text-[var(--dark-color)]">
                    {teacher.rating}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              onClick={handleBookNow}
              className="w-full bg-[var(--secondary-color)] text-white py-3 rounded-md font-medium hover:bg-[var(--light-secondary-color)] hover:text-[var(--secondary-color)] transition-colors mb-4"
            >
              Book This Teacher
            </motion.button>
          </motion.div>

          {/* Right Column - Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:w-2/3 p-6"
          >
            {isEditing ? (
              /* Edit Form */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-[var(--dark-color)]">
                  Edit Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["name", "subject", "gradeLevel", "hourlyRate"].map(
                    (field) => (
                      <motion.div key={field} variants={itemVariants}>
                        <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                          {field === "hourlyRate"
                            ? "Hourly Rate ($)"
                            : field.split(/(?=[A-Z])/).join(" ")}
                        </label>
                        <input
                          type={field === "hourlyRate" ? "number" : "text"}
                          name={field}
                          value={editForm[field]}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        />
                      </motion.div>
                    )
                  )}
                </div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                    Overview
                  </label>
                  <textarea
                    name="overview"
                    value={editForm.overview}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="flex space-x-4">
                  <motion.button
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-[var(--secondary-color)] text-white rounded-md font-medium hover:bg-[var(--light-secondary-color)] hover:text-[var(--secondary-color)] disabled:opacity-50 transition-colors"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </motion.button>
                  <motion.button
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-4 py-2 bg-white border border-[var(--primary-color)] text-[var(--primary-color)] rounded-md font-medium hover:bg-[var(--light-background)] disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              /* Display Information */
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-8"
              >
                {/* About Section */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-bold text-[var(--dark-color)] mb-3">
                    ABOUT ME
                  </h2>
                  <p className="text-[var(--text-color)]">
                    {teacher.overview ||
                      "I am a passionate educator dedicated to helping students achieve their full potential."}
                  </p>
                </motion.div>

                {/* Testimonials Section */}

                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-bold text-[var(--dark-color)] mb-3">
                    Testimonials
                  </h2>
                  {teacher.reviews?.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Carousel
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        arrows={false}
                        showDots={true}
                      >
                        {teacher.reviews.map((review, index) => (
                          <div key={index} className="p-4 mb-5 w-full">
                            <div className="bg-[var(--light-background)] p-6 rounded-lg border-l-4 border-[var(--primary-color)] ">
                              <div className="flex items-center mb-3">
                                <RatingStars value={review.rating} />
                                <span className="ml-2 text-sm text-[var(--text-color)]">
                                  {review.rating.toFixed(1)}
                                </span>
                              </div>
                              <p className="text-[var(--text-color)] italic">
                                "{review.comment}"
                              </p>
                              <div className="mt-4 flex items-center">
                                <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center mr-3">
                                  {review.studentName.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-[var(--dark-color)] font-medium">
                                    {review.studentName}
                                  </p>
                                  <p className="text-sm text-[var(--text-color)]">
                                    Student
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Carousel>
                    </motion.div>
                  ) : (
                    <p className="text-[var(--text-color)] italic">
                      No reviews yet. Be the first to review this teacher!
                    </p>
                  )}
                </motion.div>

                {/* Availability */}
                {teacher.availableDates?.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <h2 className="text-xl font-bold text-[var(--dark-color)] mb-3">
                      AVAILABILITY
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                      {teacher.availableDates.map((slot, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="bg-[var(--light-background)] text-[var(--primary-color)] py-2 px-3 rounded-md text-center text-sm font-medium border border-[var(--primary-color)]"
                        >
                          {slot.day} {slot.time}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default TeacherProfile;
