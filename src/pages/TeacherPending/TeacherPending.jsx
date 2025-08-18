import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import toast from "react-hot-toast";
import terms from "../../assets/images/assignment.png";

function TeacherPending() {
  const [overviewCount, setOverviewCount] = useState(0);
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
          navigate("/teacher");
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

      // save data to firebase
      const ref = doc(db, "newTeachers", user.uid);
      await setDoc(
        ref,
        {
          ...formDataToSave,
          hourlyRate: Number(form.hourlyRate) || null,
          ownerId: user.uid,
          submitted: true,
          approved: false,
          certificateUrl: certificateUrl,
          updatedAt: serverTimestamp(),
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
      <div className="container py-40 flex gap-9">
        <div className="">
          <h1 className="text-2xl mb-5 font-semibold">Complete your Profile</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              {/* profile Image */}
              <div>
                <label className="floating-label">
                  <input
                    className="input input-lg rounded-xl w-5/6 shadow-md 
                                focus:ring-1 focus:ring-[var(--light-secondary-color)]
                                focus:outline focus:outline-[var(--light-secondary-color)]
                                focus:border-[var(--light-secondary-color)]"
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
              <div className="grid grid-cols-3 gap-5">
                {/* subject field */}
                <div>
                  {/* <i class="fa-solid fa-asterisk text-sm text-red-500"></i> */}
                  <label className="floating-label">
                    <input
                      type="text"
                      className="input input-lg rounded-xl shadow-md
                                focus:ring-1 focus:ring-[var(--light-secondary-color)]
                                focus:outline focus:outline-[var(--light-secondary-color)]
                                focus:border-[var(--light-secondary-color)] "
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

                {/* grade level */}
                <div>
                  <label className="floating-label">
                    <input
                      type="text"
                      className="input input-lg rounded-xl shadow-md focus:ring-1 
                                  focus:ring-[var(--light-secondary-color)]
                                  focus:outline focus:outline-[var(--light-secondary-color)]
                                  focus:border-[var(--light-secondary-color)]"
                      placeholder="Preparatory / Secondary..."
                      {...register("gradeLevel", {
                        required: "Garde Level is required",
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

                {/* hourly rate */}
                <div>
                  <label className="floating-label">
                    <input
                      type="number"
                      min="0"
                      className="input input-lg rounded-xl w-3/6 shadow-md
                                focus:ring-1 focus:ring-[var(--light-secondary-color)]
                                focus:outline focus:outline-[var(--light-secondary-color)]
                                focus:border-[var(--light-secondary-color)]"
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

              {/* upload file */}
              <div>
                <input
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  className="file-input
                  rounded-xl shadow-md w-5/6
                              focus:ring-1 focus:ring-[var(--light-secondary-color)]
                              focus:outline focus:outline-[var(--light-secondary-color)]
                              focus:border-[var(--light-secondary-color)] "
                  {...register("certificate", {
                    required: "A Certificate is required",
                  })}
                />
                {errors.certificate && (
                  <div className="text-red-500 text-sm lg:text-xl">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span className="text-sm">
                      {" "}
                      {errors.certificate.message}{" "}
                    </span>
                  </div>
                )}
              </div>

              {/* overview */}
              <div className="flex flex-col">
                <label htmlFor="">Overview</label>
                <textarea
                  className="textarea rounded-xl shadow-md w-5/6
                              focus:ring-1 focus:ring-[var(--light-secondary-color)]
                              focus:outline focus:outline-[var(--light-secondary-color)]
                              focus:border-[var(--light-secondary-color)]"
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

              {/* modal */}
              <div>
                <button
                  type="button"
                  className="btn
                   bg-white  text-[var(--secondary-color)]
                    hover:text-white hover:bg-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Read Terms & Conditions
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <div className="flex gap-2 items-center">
                      <div className="w-10">
                        <img src={terms} alt="" />
                      </div>
                      <h3 className="font-bold text-lg text-[var(--primary-color)]">
                        Our Terms & Conditions
                      </h3>
                    </div>

                    <div className="py-4 ">
                      <p className="flex items-baseline text-sm">
                        <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                        I confirm that all information and documents I provide
                        are accurate and truthful.
                      </p>
                      <br></br>

                      <p className="flex items-baseline text-sm">
                        <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                        I agree that the platform has the right to review my
                        profile and documents before approving me as a teacher.
                      </p>
                      <br></br>

                      <p className="flex items-baseline text-sm">
                        <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                        I agree not to share or upload any inappropriate,
                        offensive, or misleading content.
                      </p>
                      <br></br>

                      <p className="flex items-baseline text-sm">
                        <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                        I agree to conduct myself professionally and
                        respectfully when interacting with students.
                      </p>
                      <br></br>

                      <p className="flex items-baseline text-sm">
                        <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                        I agree that the platform reserves the right to suspend
                        or remove my account if I violate the rules or provide
                        false information.
                      </p>
                      <br></br>

                      <p className="flex items-baseline text-sm">
                        <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                        I understand that lesson prices, commissions, and
                        payment methods are subject to the platform’s policies.
                      </p>
                      <br></br>

                      <p className="flex items-baseline text-sm">
                        <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                        I acknowledge that my approval as a teacher is not
                        guaranteed and depends on the platform’s review process.
                      </p>
                    </div>
                    <div className="modal-action">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("my_modal_1").close()
                        }
                        className="btn text-white 
                          bg-[var(--primary-color)] hover:bg-white hover:text-[var(--primary-color)] transition-colors duration-300 shadow-md 
                          border-[var(--primary-color)]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </dialog>
              </div>

              {/* terms and conditions */}
              <div>
                <input
                  type="checkbox"
                  className="checkbox mr-2 border-[var(--light-secondary-color)] bg-[var(--light-secondary-color)] checked:border-orange-500 checked:bg-[var(--secondary-color)] checked:text-orange-800"
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

        <div className="w-2/6">
          <div className="text-center text-2xl font-semibold text-shadow-lg">
            <h2>
              Welcome aboard! We’re excited to have you here! Fill in your
              details and begin your teaching journey.
            </h2>
          </div>
          <img
            src="/images/online-learning-animate.svg"
            alt="A description of the animation"
          />
        </div>
      </div>
    </>
  );
}

export default TeacherPending;
