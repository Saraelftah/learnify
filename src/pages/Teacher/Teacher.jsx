import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { setTeachers } from "../../store/TeachersSlice";
import toast from "react-hot-toast";

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

      if (fileToUpload) {
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
          updatedAt: serverTimestamp(),
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
            <div className="flex flex-col items-center">
              {/* Display current image*/}
              <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
                <img
                  src={profileData.Image || "https://i.ibb.co/Kg8TGk7/user.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-xl font-semibold mb-2">
                Subject: {profileData.subject}
              </h2>
              <p className="text-gray-600 mb-2">
                Grade Level: {profileData.gradeLevel}
              </p>
              <p className="text-gray-600 mb-4">
                Hourly Rate: {profileData.hourlyRate} EGP
              </p>

              <div className="w-full text-left">
                <h3 className="text-lg font-medium mt-6 mb-2">Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {profileData.overview}
                </p>

                <h3 className="text-lg font-medium mt-6 mb-2">Availability</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.availableDates.map((date, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium"
                    >
                      {date.day} - {date.time} {date.period}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="btn mt-8 text-white bg-[var(--secondary-color)] rounded-3xl hover:bg-white hover:text-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </>
        )}

        {isEditing && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-5">
              {/* عرض الصورة الحالية أو معاينة الصورة الجديدة */}
              <div className="relative w-40 h-40 mb-2 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg cursor-pointer">
                <img
                  src={
                    imagePreview ||
                    profileData.Image ||
                    "https://placehold.co/160x160/cccccc/333333?text=No+Image"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {/* Overlay for image upload */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm">Change Image</span>
                </div>
              </div>

              {/* حقل رفع الصورة */}
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="file-input file-input-bordered w-full max-w-xs mb-6"
                {...register("Image")}
              />

              <div className="grid grid-cols-3 gap-5">
                {/* Subject field */}
                <div>
                  <label className="floating-label">
                    <input
                      type="text"
                      className="input input-lg rounded-xl shadow-md focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
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
                      className="input input-lg rounded-xl shadow-md focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
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
                      className="input input-lg rounded-xl w-3/6 shadow-md focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
                      placeholder="80 EG..."
                      {...register("hourlyRate", {
                        required: "Price is required",
                      })}
                    />
                    <span>Hourly Rate</span>
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
              <div className="flex flex-col">
                <label htmlFor="">Overview</label>
                <textarea
                  className="textarea rounded-xl shadow-md w-5/6 focus:ring-1 focus:ring-[var(--light-secondary-color)] focus:outline focus:outline-[var(--light-secondary-color)] focus:border-[var(--light-secondary-color)]"
                  rows={4}
                  placeholder="Tell students about your experience and teaching style..."
                  {...register("overview", {
                    required: "Overview is required",
                    minLength: { value: 30, message: "At least 30 characters" },
                    maxLength: { value: 500, message: "max 500 characters" },
                  })}
                  onChange={(e) => setOverviewCount(e.target.value.length)}
                />
                <p className="text-sm text-gray-500 text-end w-5/6 mt-2">
                  {overviewCount}/500
                </p>
                {errors.overview && (
                  <div className="text-red-500 text-sm lg:text-xl">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span className="text-sm"> {errors.overview.message} </span>
                  </div>
                )}
              </div>

              {/* available dates */}
              <div>
                <div className="w-3/6 flex items-center gap-10 mb-5">
                  <label htmlFor="Available Dates">Available Dates</label>
                  <button
                    type="button"
                    className="btn  text-white bg-[var(--light-primary-color)] rounded-3xl border-[var(--light-primary-color)]
                     hover:bg-white hover:text-[var(--light-primary-color)] transition-colors duration-300 shadow-md"
                    onClick={() =>
                      append({ day: "Monday", time: "5:00", period: "PM" })
                    }
                  >
                    + Add Date
                  </button>
                </div>

                <div className="space-y-2">
                  {fields.map((field, idx) => (
                    <div key={field.id} className="grid grid-cols-12 gap-2">
                      <select
                        className="select select-bordered col-span-5"
                        {...register(`availableDates.${idx}.day`)}
                      >
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ].map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                      <input
                        className="input input-bordered col-span-4"
                        placeholder="5:00"
                        {...register(`availableDates.${idx}.time`)}
                      />
                      <select
                        className="select select-bordered col-span-2"
                        {...register(`availableDates.${idx}.period`)}
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                      <button
                        type="button"
                        className="btn btn-ghost col-span-1"
                        onClick={() => remove(idx)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn text-white bg-[var(--secondary-color)] rounded-3xl hover:bg-white hover:text-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline border-gray-400 text-gray-600 rounded-3xl hover:bg-gray-200 hover:border-gray-400"
                  onClick={() => {
                    setIsEditing(false);
                    // إعادة تعيين الفورم إلى البيانات الأصلية
                    const teacherData = teachers.find((t) => t.id === user.uid);
                    if (teacherData) {
                      reset(teacherData);
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default Teacher;
