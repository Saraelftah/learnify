import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import toast from "react-hot-toast";

function TeacherPending() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

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
    formState: { errors },
  } = useForm({ defaultValues });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availableDates",
  });

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "newTeachers", user.uid);
      if (!user) return;
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        if (data.approved === true) {
          toast.success("Your profile is already approved");
          navigate("/teacher");
        }
      }
    };
    load();
  }, [user, reset, navigate]);

  // on submitting form with data
  const onSubmit = async (form) => {
    if (!user) return;
    const ref = doc(db, "newTeachers", user.uid);
    try {
      await setDoc(
        ref,
        {
          ...form,
          hourlyRate: Number(form.hourlyRate) || null,
          ownerId: user.uid,
          submitted: true,
          approved: false,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      toast.success("Profile submitted for review.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit profile");
    }
  };

  return (
    <>
      <div className="container py-30">
        <h1 className="text-2xl mb-5">Complete your Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex w-4/6 gap-5">
              {/* profile Image */}
              <div>
                <label className="floating-label">
                  <input
                    className="input input-lg rounded-2xl"
                    autoComplete="off"
                    {...register("Image", {
                      validate: (value) =>
                        !value ||
                        /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value) ||
                        "Invalid image URL",
                    })}
                    placeholder="https://..."
                  />
                  <span>Profile Image URL</span>
                </label>
                {errors.Image && (
                  <p className="text-red-600 text-sm">{errors.Image.message}</p>
                )}
              </div>

              {/* subject field */}
              <div>
                <label className="floating-label">
                  <input
                    type="text"
                    className="input input-lg rounded-2xl"
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
                    <span className="text-sm"> {errors.subject.message} </span>
                  </div>
                )}
              </div>
            </div>

            {/* grade level */}
            <div>
              <label className="floating-label">
                <input
                  type="text"
                  className="input input-lg w-2/6 rounded-2xl"
                  placeholder="Preparatory / Secondary..."
                  {...register("gradeLevel", {
                    required: "Garde Level is required",
                  })}
                />
                <span>Garde Levelt</span>
              </label>
              {errors.gradeLevel && (
                <div className="text-red-500 text-sm lg:text-xl">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="text-sm"> {errors.gradeLevel.message} </span>
                </div>
              )}
            </div>

            {/* hourly rate */}
            <div>
              <label className="floating-label">
                <input
                  type="number"
                  min="0"
                  className="input input-lg w-2/6 rounded-2xl"
                  placeholder="80 EG..."
                  {...register("hourlyRate", { required: "Price is required" })}
                />
                <span>Subject</span>
              </label>
              {errors.hourlyRate && (
                <div className="text-red-500 text-sm lg:text-xl">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span className="text-sm"> {errors.hourlyRate.message} </span>
                </div>
              )}
            </div>

            {/* First lesson free */}
            <div className="flex gap-2">
              <label className="">First lesson free</label>
              <input
                type="checkbox"
                className="checkbox"
                {...register("firstLessonFree")}
              />
            </div>

            {/* overview */}
            <div className="flex flex-col">
              <label htmlFor="">Overview</label>
              <textarea
                className="textarea rounded-2xl w-3/6"
                rows={4}
                placeholder="Tell students about your experience and teaching style..."
                {...register("overview", {
                  required: "Overview is required",
                  minLength: { value: 30, message: "At least 30 characters" },
                })}
              />
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
                  className="btn"
                  onClick={() =>
                    append({ day: "Monday", time: "5:00", period: "PM" })
                  }
                >
                  + Add Slot
                </button>
              </div>

              <div className="">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex justify-between">
                    <select
                      className="select select-bordered col-span-5"
                      {...register(`availableDates.${index}.time`)}
                    >
                      {[
                        "Saturday",
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                      ].map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                    <input
                      className="input input-bordered col-span-4"
                      placeholder="5:00"
                      {...register(`availableDates.${index}.time`)}
                    />
                    <select
                      className="select select-bordered col-span-2"
                      {...register(`availableDates.${index}.period`)}
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-ghost col-span-1"
                      onClick={() => remove(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="btn mt-5">
            Submit For Review
          </button>
        </form>
      </div>
    </>
  );
}

export default TeacherPending;
