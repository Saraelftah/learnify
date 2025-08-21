import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setTeachers } from "../../store/TeachersSlice";
import toast from "react-hot-toast";
import RatingStars from "../../components/RatingStars/RatingStars";
import "cally";
import Overview from "../../components/Overview/Overview";
import FormInput from "../../components/FormInput/FormInput";
import AvailableDates from "../../components/AvailableDates/AvailableDates";
import NoReviewSection from "../../components/NoReviewSection/NoReviewSection";
import AvailableDatesDisplay from "../../components/AvailableDatesDisplay/AvailableDatesDisplay";

function Teacher() {
  const [loading, setLoading] = useState(0);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [overviewCount, setOverviewCount] = useState(0);
  // for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const teachers = useSelector((state) => state.teachers.teachers);
  const dispatch = useDispatch();

  const defaultValues = {
    Image: "",
    subject: "",
    rating: 0,
    gradeLevel: "",
    lessonType: "Online",
    hourlyRate: "",
    firstLessonFree: false,
    overview: "",
    reviews: [],
    availableDates: [{ date: "", time: "" }],
    availableGroupDates: [{ date: "", time: "" }],
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const newImageFile = watch("Image");

  useEffect(() => {
    if (newImageFile && newImageFile[0] instanceof File) {
      const file = newImageFile[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      // cleanup
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [newImageFile]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    const teacherData = teachers.find((t) => t.id === user.uid);
    if (teacherData) {
      reset(teacherData);
      setOverviewCount(teacherData.overview?.length || 0);
      setLoading(false);
    } else {
      const fetchTeacherData = async () => {
        try {
          const ref = doc(db, "teachers", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            reset(data);
            setOverviewCount(data.overview?.length || 0);
            const updatedTeachers = [...teachers, { id: snap.id, ...data }];
            dispatch(setTeachers(updatedTeachers));
          } else {
            navigate("/pending");
          }
        } catch (err) {
          console.error("Failed to fetch teacher data:", err);
          toast.error("Failed to load your profile data.");
        } finally {
          setLoading(false);
        }
      };

      fetchTeacherData();
    }
  }, [user, navigate, reset, teachers, dispatch]);

  // on submit the form
  const onSubmit = async (form) => {
    if (!user) return;
    try {
      let imageUrl = form.Image;
      const fileToUpload = form.Image[0];

      if (fileToUpload && fileToUpload instanceof File) {
        const result = await toast.promise(
          (async () => {
            const data = new FormData();
            data.append("file", fileToUpload);
            data.append("upload_preset", "im54mwpi");

            const res = await fetch(
              "https://api.cloudinary.com/v1_1/dhcclmr8d/upload",
              { method: "POST", body: data }
            );

            if (!res.ok) throw new Error("Cloudinary upload failed.");
            return await res.json();
          })(),
          {
            loading: "Uploading profile photo...",
            success: "profile photo uploaded successfully!",
            error: "profile photo upload failed.",
          }
        );

        // file url
        imageUrl = result.secure_url;
        console.log("Uploaded file URL:", imageUrl);
      }

      const formDataToSave = { ...form };
      delete formDataToSave.Image;

      const ref = doc(db, "teachers", user.uid);
      await setDoc(
        ref,
        {
          ...formDataToSave,
          Image: imageUrl,
          hourlyRate: Number(form.hourlyRate) || null,
        },
        { merge: true }
      );
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const profileData = watch();

  return (
    <>
      <div className="container py-40">
        {/* not edit mode */}
        {!isEditing && (
          <>
            <div className="flex flex-col lg:flex-row gap-5 lg:items-start ">
              {/* Display current image*/}
              <div
                className="flex flex-col items-center bg-[var(--card-background)] py-4 px-8 rounded-2xl shadow-md"
                data-aos="fade-up"
              >
                <div className="relative w-60 h-60 mb-6 rounded-full overflow-hidden shadow-lg border-4 border-[var(--primary-color)]">
                  <img
                    src={
                      profileData.Image || "https://i.ibb.co/Kg8TGk7/user.png"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* first lesson free badge */}
                {profileData.firstLessonFree ? (
                  <div className=" badge badge-soft bg-pink-100">
                    First Lesson Free
                  </div>
                ) : null}

                {/* edit profile btn */}
                <button
                  className="btn mt-8 hover:text-white hover:bg-[var(--secondary-color)] rounded-xl bg-white text-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
              {/* data */}
              <div
                className="lg:w-3/6 py-4 px-6 rounded-2xl bg-[var(--card-background)] shadow-md"
                data-aos="fade-down"
              >
                <div>
                  {/* names */}
                  <h2 className="text-2xl capitalize font-bold mb-8">
                    {profileData.name}
                  </h2>

                  {/* rating */}
                  <div className="mb-2">
                    <RatingStars value={profileData.rating} />
                  </div>

                  {/* subject */}
                  <p className="text-md md:text-lg mb-2">
                    Subject:{" "}
                    <span className="font-semibold">{profileData.subject}</span>
                  </p>
                  {/* grade level */}
                  <p className="text-md md:text-lg mb-2">
                    Grade Level:{" "}
                    <span className="font-semibold">
                      {profileData.gradeLevel}
                    </span>
                  </p>
                  {/* hourly rate */}
                  <p className="text-md md:text-lg mb-4">
                    Hourly Rate:{" "}
                    <b className="text-[var(--stars-color)]">
                      {profileData.hourlyRate} EGP
                    </b>
                  </p>

                  {/* overview */}
                  <div
                    className="py-4 px-2 mb-2 shadow-lg rounded-2xl 
                bg-[var(--light-background)]"
                  >
                    <h3 className="text-lg font-medium mb-2">Overview</h3>
                    <p className="text-sm md:text-[16px]">
                      {profileData.overview}
                    </p>
                  </div>
                </div>
              </div>
              {/* dates */}
              <div
                className="py-4 px-6 rounded-2xl bg-[var(--card-background)] shadow-md"
                data-aos="fade-up"
              >
                {/* available Individual dates */}
                <AvailableDatesDisplay
                  dates={profileData?.availableDates}
                  title="Available Individual Dates"
                />
                <div className="divider">
                  <i className="fa-solid fa-calendar-days text-2xl text-[var(--primary-color)]"></i>
                </div>
                {/* Display Group Dates */}
                <AvailableDatesDisplay
                  dates={profileData?.availableGroupDates}
                  title="Available Group Dates"
                />
              </div>
            </div>

            <div
              className="bg-[var(--card-background)] rounded-2xl shadow-md mt-5 p-4 "
              data-aos="fade-right"
            >
              <NoReviewSection />
            </div>
          </>
        )}

        {/* Editing mode */}
        {isEditing && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8 justify-between items-center md:flex-row md:items-start lg:justify-start lg:gap-20">
              {/* image section */}
              <div className="flex flex-col gap-5 items-center bg-[var(--card-background)] py-4 px-8 rounded-2xl shadow-md">
                <div
                  className="relative lg:w-60 lg:h-60 mb-2 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg cursor-pointer
                w-40 h-40"
                >
                  <img
                    src={
                      imagePreview ||
                      profileData.Image ||
                      "https://i.ibb.co/Kg8TGk7/user.png"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay for image upload */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm">Change Image</span>
                  </div>
                </div>

                {/* upload photo*/}
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="file-input file-input-ghost"
                  {...register("Image")}
                />
              </div>

              <div className="lg:w-3/6 px-4 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:w-5/6 w-full">
                  {/* Subject field */}
                  <FormInput
                    label="Subject"
                    type="text"
                    placeholder="Math / English..."
                    name="subject"
                    register={register}
                    rules={{
                      required: "Subject is required",
                    }}
                    error={errors.subject}
                  />

                  {/* Grade Level */}
                  <FormInput
                    label="Grade Level"
                    type="text"
                    placeholder="Preparatory / Secondary..."
                    name="gradeLevel"
                    register={register}
                    rules={{
                      required: "Garde Level is required",
                    }}
                    error={errors.gradeLevel}
                  />

                  {/* Hourly Rate */}
                  <FormInput
                    label="Hourly Rate EG"
                    type="number"
                    placeholder="80 EG..."
                    name="hourlyRate"
                    register={register}
                    rules={{
                      required: "Price is required",
                    }}
                    error={errors.hourlyRate}
                  />
                </div>

                {/* First lesson free */}
                <div className="flex gap-2">
                  <label className="">First lesson free</label>
                  <input
                    type="checkbox"
                    className="checkbox bg-[var(--light-secondary-color)]"
                    {...register("firstLessonFree")}
                  />
                </div>

                {/* Overview */}
                <Overview
                  register={register}
                  error={errors.overview}
                  overviewCount={overviewCount}
                  setOverviewCount={setOverviewCount}
                />

                {/* available dates */}
                <AvailableDates
                  control={control}
                  register={register}
                  name="availableDates"
                />

                <AvailableDates
                  control={control}
                  register={register}
                  name="availableGroupDates"
                />

                {/* buttons */}
                <div className="flex gap-4 mt-8 lg:w-5/6 w-full justify-center">
                  {/* submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn text-white bg-[var(--secondary-color)] rounded-3xl hover:bg-white hover:text-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                  {/* cancel */}
                  <button
                    type="button"
                    className="btn border-[var(--secondary-color)] text-[var(--secondary-color)] rounded-3xl hover:bg-[var(--secondary-color)] hover:text-white"
                    onClick={() => {
                      setIsEditing(false);
                      const teacherData = teachers.find(
                        (t) => t.id === user.uid
                      );
                      if (teacherData) {
                        reset(teacherData);
                      }
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default Teacher;

