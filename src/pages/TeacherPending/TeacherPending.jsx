import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import toast from "react-hot-toast";
import Overview from "../../components/Overview/Overview";
import FormInput from "../../components/FormInput/FormInput";
import TermsModal from "../../components/TermsModal/TermsModal";
import PendingImg from "../../components/PendingImg/PendingImg";
import FormSelector from "../../components/FormSelector/FormSelector";

function TeacherPending() {
  const [overviewCount, setOverviewCount] = useState(0);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const defaultValues = {
    Image: "",
    name: "",
    subject: "",
    gradeLevel: "",
    lessonType: "Online",
    hourlyRate: "",
    firstLessonFree: false,
    overview: "",
    certificate: null,
    agreeTerms: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "newTeachers", user.uid);
      if (!user) return;
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        if (data.approved === true) {
          toast.success("Your profile is already approved");
          // navigate("/teacher");
        }
      }
    };
    load();
  }, [user, navigate]);

  // on submitting form with data
  const onSubmit = async (form) => {
    if (!user) return;
    try {
      let certificateUrl = "";
      const fileToUpload = form.certificate[0];

      if (!fileToUpload) {
        toast.error("Please upload a certificate.");
        return;
      }
      // Await the promise from toast.promise to ensure the upload finishes
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
      certificateUrl = result.secure_url;
      console.log("Uploaded file URL:", certificateUrl);

      const formDataToSave = { ...form };
      delete formDataToSave.certificate;
      // get the name from users collection
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let userName = "";
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        userName = userData.name;
      }

      // save data to firebase
      const ref = doc(db, "newTeachers", user.uid);
      await setDoc(
        ref,
        {
          ...formDataToSave,
          hourlyRate: Number(form.hourlyRate) || null,
          ownerId: user.uid,
          name: userName,
          submitted: true,
          approved: false,
          certificateUrl: certificateUrl,
          // updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      toast.success("Profile submitted for review.");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit profile");
    }
  };

  return (
    <>
      <div className="container py-30 lg:py-40 flex gap-9 justify-between flex-col-reverse lg:flex-row">
        <div className="lg:w-3/6 " data-aos="fade-right">
          <h1 className="text-2xl mb-5 font-semibold hidden lg:block">
            Complete your Profile
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              {/* profile Image */}

              <FormInput
                label="Profile Image URL"
                type="text"
                placeholder="https://..."
                name="Image"
                register={register}
                rules={{
                  validate: (value) =>
                    !value ||
                    /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value) ||
                    "Invalid image URL",
                }}
                error={errors.Image}
              />

              <div className="grid grid-cols-3 gap-5">
                {/* subject */}
                <FormSelector
                  name="subject"
                  label="Subject"
                  options={[
                    "Math",
                    "English",
                    "Science",
                    "History",
                    "Geography",
                    "Biology",
                    "Chemistry",
                    "Physics",
                    "Italy",
                  ]}
                  register={register}
                  rules={{ required: "Subject is required" }}
                  error={errors.subject}
                />

                {/* grade level */}
                <FormSelector
                  name="gradeLevel"
                  label="Grade Level"
                  options={[
                    "Preparatory",
                    "Secondary",
                    "Preparatory and Secondary",
                  ]}
                  register={register}
                  rules={{ required: "Grade Level is required" }}
                  error={errors.gradeLevel}
                />

                <FormInput
                  label="Hourly Rate"
                  type="number"
                  placeholder="80 EG..."
                  name="hourlyRate"
                  min="0"
                  register={register}
                  rules={{
                    required: "Price is required",
                  }}
                  error={errors.hourlyRate} 
                />
              </div>

              {/* upload file */}
              <div>
                <input
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  className="file-input
                  rounded-xl shadow-md w-full
                  bg-[var(--card-background)]
                              focus:ring-1 focus:ring-[var(--light-secondary-color)]
                              focus:outline focus:outline-[var(--light-secondary-color)]
                              focus:border-[var(--light-secondary-color)] "
                  {...register("certificate", {
                    required: "A Certificate is required",
                  })}
                />
                {errors.certificate && (
                  <div className="text-red-500 text-sm">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span> {errors.certificate.message} </span>
                  </div>
                )}
              </div>

              <Overview
                register={register}
                error={errors.overview}
                overviewCount={overviewCount}
                setOverviewCount={setOverviewCount}
              />

              {/* modal */}
              <TermsModal />

              {/* terms and conditions */}
              <div>
                <input
                  type="checkbox"
                  className="checkbox mr-2 border-[var(--secondary-color)] bg-[var(--light-secondary-color)] checked:border-orange-500 checked:bg-[var(--secondary-color)] checked:text-orange-800"
                  {...register("agreeTerms", { required: true })}
                />
                <label>I agree to the Terms and Conditions</label>
                {errors.agreeTerms && (
                  <div className="text-red-500 text-sm lg:text-xl">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span className="text-sm">
                      {" "}
                      You must agree before submitting{" "}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* submit button */}
            <button
              type="submit"
              disabled={!watch("agreeTerms") || isSubmitting}
              className="btn mt-8 text-white bg-[var(--secondary-color)] rounded-3xl 
               hover:bg-white hover:text-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
            >
              {isSubmitting ? "Submitting..." : "Submit For Review"}
            </button>
          </form>
        </div>

        <PendingImg />
      </div>
    </>
  );
}

export default TeacherPending;
