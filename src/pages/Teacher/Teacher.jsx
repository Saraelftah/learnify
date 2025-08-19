import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { setTeachers } from "../../store/TeachersSlice";
import toast from "react-hot-toast";
import RatingStars from "../../components/RatingStars/RatingStars";
import "cally";

function Teacher() {
  // const [value, setValue] = useState("");
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
    availableDates: [{ day: "Monday", time: "5:00", period: "PM" }],
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availableDates",
  });

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
            loading: "Uploading certificate...",
            success: "Certificate uploaded successfully!",
            error: "Certificate upload failed.",
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
        {!isEditing && (
          <>
            {/*  border-4 border-[var(--primary-color)] */}
            {/* bg-gradient-to-b from-[#f2773b] to-[#1d9190] p-1 */}
            <div className="flex gap-20 items-start py-3  rounded-2xl shadow-lg">
              {/* Display current image*/}
              <div className="flex flex-col items-center">
                <div className="relative w-60 h-60 mb-6 rounded-full overflow-hidden shadow-lg border-4 border-[var(--primary-color)]">
                  <img
                    src={
                      profileData.Image || "https://i.ibb.co/Kg8TGk7/user.png"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="btn mt-8 hover:text-white hover:bg-[var(--secondary-color)] rounded-xl bg-white text-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>

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
                <p className="text-xl mb-2">
                  Subject:{" "}
                  <span className="font-semibold">{profileData.subject}</span>
                </p>
                {/* grade level */}
                <p className="mb-2">
                  Grade Level:{" "}
                  <span className="font-semibold">
                    {profileData.gradeLevel}
                  </span>
                </p>
                {/* hourly rate */}
                <p className="mb-4">
                  Hourly Rate:{" "}
                  <b className="text-[var(--stars-color)]">
                    {profileData.hourlyRate} EGP
                  </b>
                </p>

                {/* overview */}
                <div
                  className="w-3/6 py-4 px-2 shadow-lg rounded-2xl 
                bg-[var(--light-background)]"
                >
                  <h3 className="text-lg font-medium mb-2">Overview</h3>
                  <p>{profileData.overview}</p>
                </div>

                {/* available dates */}
                <h3 className="text-lg font-medium mt-6 mb-2">Availability</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.availableDates.map((date, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[var(--light-secondary-color)] rounded-full font-medium"
                    >
                      {date.day} - {date.time} {date.period}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Editing mode */}
        {isEditing && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-8 justify-between items-center md:flex-row md:items-start lg:justify-start lg:gap-20">
              {/* image section */}
              <div className="flex flex-col gap-5 items-center">
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
                  <div>
                    <label className="floating-label">
                      <input
                        type="text"
                        className="input rounded-lg shadow-md lg:input-lg
                        focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
                        placeholder="Math / English..."
                        {...register("subject", {
                          required: "Subject is required",
                        })}
                      />
                      <span>Subject</span>
                    </label>
                    {errors.subject && (
                      <div className="text-red-500 text-sm lg:text-xl">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span className="text-sm">
                          {" "}
                          {errors.subject.message}{" "}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Grade Level */}
                  <div>
                    <label className="floating-label">
                      <input
                        type="text"
                        className="input lg:input-lg rounded-lg shadow-md
                        focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
                        placeholder="Preparatory / Secondary..."
                        {...register("gradeLevel", {
                          required: "Grade Level is required",
                        })}
                      />
                      <span>Grade Level</span>
                    </label>
                    {errors.gradeLevel && (
                      <div className="text-red-500 text-sm lg:text-xl">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span className="text-sm">
                          {" "}
                          {errors.gradeLevel.message}{" "}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hourly Rate */}
                  <div>
                    <label className="floating-label">
                      <input
                        type="number"
                        min="0"
                        className="input lg:input-lg rounded-lg shadow-md
                         focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
                        placeholder="80 EG..."
                        {...register("hourlyRate", {
                          required: "Price is required",
                        })}
                      />
                      <span>Hourly Rate EG</span>
                    </label>
                    {errors.hourlyRate && (
                      <div className="text-red-500 text-sm lg:text-xl">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span className="text-sm">
                          {" "}
                          {errors.hourlyRate.message}{" "}
                        </span>
                      </div>
                    )}
                  </div>
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
                <div className="flex flex-col lg:w-5/6 w-full">
                  <label htmlFor="">Overview</label>
                  <textarea
                    className="textarea rounded-lg shadow-md w-full focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
                    rows={4}
                    placeholder="Tell students about your experience and teaching style..."
                    {...register("overview", {
                      required: "Overview is required",
                      minLength: {
                        value: 30,
                        message: "At least 30 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "max 500 characters",
                      },
                    })}
                    onChange={(e) => setOverviewCount(e.target.value.length)}
                  />
                  <p className="text-sm text-gray-500 text-end w-full mt-2">
                    {overviewCount}/500
                  </p>
                  {errors.overview && (
                    <div className="text-red-500 text-sm lg:text-xl">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      <span className="text-sm">
                        {" "}
                        {errors.overview.message}{" "}
                      </span>
                    </div>
                  )}
                </div>

                {/* available dates */}
                <div>
                  <label htmlFor="Available Dates">Available Dates</label>

                  <div className="space-y-2 lg:w-5/6 w-full">
                    {fields.map((field, idx) => (
                      <div
                        key={field.id}
                        className="flex justify-center gap-2 p-3 bg-gray-50 rounded-xl shadow-sm items-end"
                      >
                        <div className="w-full">
                          <label className="text-sm">Date</label>
                          <input
                            type="date"
                            className="input input-sm md:input-md
                           focus:border-[var(--light-secondary-color)] focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)]"
                            {...register(`availableDates.${idx}.date`)}
                          />
                        </div>
                        {/* time */}
                        <div className="w-full">
                          <label className="text-sm">Time</label>
                          <input
                            type="time"
                            className="input input-sm md:input-md focus:border-[var(--light-secondary-color)] focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)]"
                            {...register(`availableDates.${idx}.time`)}
                          />
                        </div>

                        {/* remove */}
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => remove(idx)}
                        >
                          <i className="fa-regular fa-trash-can text-red-500"></i>
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn w-full rounded-lg shadow-md mt-2
                        text-[var(--light-primary-color)] bg-transparent border-dashed border-[var(--light-primary-color)]
                        hover:bg-[var(--light-primary-color)] hover:text-white transition-colors duration-300"
                      onClick={() =>
                        append({ day: "Monday", time: "5:00", period: "PM" })
                      }
                    >
                      + Add Date
                    </button>
                  </div>
                </div>

                {/* buttons */}
                <div className="flex gap-4 mt-8 lg:w-5/6 w-full justify-center">
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
