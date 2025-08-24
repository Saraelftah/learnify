import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ConfirmPopup from "../../components/ConfirmPopup/ConfirmPopup";
import { bookAppointment } from "../../store/StudentsSlice";
import DetailsStep from "../../components/DetailsStep/DetailsStep";
import BookStep from "../../components/BookStep/BookStep";
import PaymentStep from "../../components/PaymentStep/PaymentStep";
import Stepper from "../../components/Stepper/Stepper";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import SummaryCard from "../../components/SummaryCard/SummaryCard";

const steps = ["Book", "Your Details", "Payment"];

function Payment() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { id: teacherId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  // get teachers from redux
  const teachers = useSelector((state) => state.teachers.teachers);
  const currentUser = useSelector((state) => state.users.currentUser);
  const teacher = useMemo(
    () => teachers.find((t) => t.id === teacherId),
    [teachers, teacherId]
  );

  const sessionType = watch("sessionType");
  const selectedDate = watch("selectedDate");
  const selectedTime = watch("selectedTime");
  // session price
  const sessionPrice = useMemo(() => {
    if (!teacher || !sessionType) return 0;
    return sessionType === "Group Session"
      ? teacher.hourlyRate * 0.8
      : teacher.hourlyRate;
  }, [sessionType, teacher]);

  // Filter available times based on the selected date
  const availableTimes = useMemo(() => {
    if (!selectedDate || !teacher) return [];
    const dates =
      sessionType === "Private"
        ? teacher.availableDates
        : teacher.availableGroupDates;

    const selectedDayTimes = dates?.filter((d) => d.date === selectedDate);

    return selectedDayTimes || [];
  }, [selectedDate, sessionType, teacher]);

  useEffect(() => {
    if (currentUser) {
      reset({
        firstName: currentUser.name.split(" ")[0] || "",
        lastName: currentUser.name.split(" ")[1] || "",
        email: currentUser.email || "",
        mobile: currentUser.phone || "",
      });
    }
  }, [currentUser, reset]);

  const handleNext = async () => {
    const stepFields = {
      0: ["sessionType", "selectedDate", "selectedTime"],
      1: ["firstName", "lastName", "email", "mobile"],
      2: ["cardNumber", "cvv", "expiry", "cardHolder"],
    };

    const isValid = await trigger(stepFields[activeStep]);
    if (isValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const handleBack = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  const onSubmit = async (data) => {
    const roomName = `Session_${Date.now()}`;
    const jistsiLink = `https://meet.jit.si/${roomName}`;

    const bookingDetails = {
      id: Date.now(),
      teacherId: teacherId,
      teacherImage: teacher?.Image,
      teacherName: teacher?.name,
      subject: teacher?.subject,
      sessionType: data.sessionType,
      date: data.selectedDate,
      time: data.selectedTime,
      meetingLink: jistsiLink,
      price:
        data.sessionType === "Group Session"
          ? teacher?.hourlyRate * 0.8
          : teacher?.hourlyRate,
      payment: {
        cardHolder: data.cardHolder,
        last4: data.cardNumber.slice(-4),
      },
      status: "Paid",
    };
    // using a confirm popup to confirm the booking
    setShowPopup({
      title: "Confirm Booking",
      message: `Are you sure you want to book a ${data.sessionType} session with
      ${teacher?.name}
       on ${data.selectedDate} at ${data.selectedTime}
        for EGP${bookingDetails.price}
       ?`,
      onConfirm: async () => {
        try {
          await dispatch(
            bookAppointment({
              studentId: currentUser?.uid,
              bookingDetails,
            })
          ).unwrap();
          setShowPopup(false);
          setShowModal(true);
        } catch (error) {
          console.error("Error booking appointment:", error);
          setShowPopup({
            title: "Booking Failed",
            message:
              "There was an error booking your appointment. Please try again.",
            onConfirm: () => setShowPopup(false),
          });
        }
      },
      onCancel: () => {
        setShowPopup(false);
      },
    });
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <BookStep
            teacher={teacher}
            sessionType={sessionType}
            availableDates={teacher?.availableDates}
            availableGroupDates={teacher?.availableGroupDates}
            availableTimes={availableTimes}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        );
      case 1:
        return <DetailsStep register={register} errors={errors} />;
      case 2:
        return <PaymentStep register={register} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className=" p-4 mt-20">
      <div className="container">
        {showPopup && (
          <ConfirmPopup
            title={showPopup.title}
            description={showPopup.message}
            buttonTitle="Confirm"
            buttonFunction={showPopup.onConfirm}
            close={showPopup.onCancel}
          />
        )}
        {/* DaisyUI Success Modal */}
        {showModal && <SuccessModal setShowModal={setShowModal} />}
        {/* grid grid-cols-1 lg:grid-cols-5 */}

        <div className="flex flex-col gap-10 lg:flex-row justify-between lg:gap-5 shadow-[var(--box-shadow)] p-4 lg:p-10 capitalize rounded-lg bg-[var(--card-background)] lg:mt-20 mt-10">

          <div className="lg:w-4/6 w-full flex flex-col justify-between gap-5 ">
            {/* Stepper */}
            <Stepper steps={steps} activeStep={activeStep} />

            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStep()}
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 px-8">
                <button
                  type="button"
                  className="btn border-[var(--secondary-color)] text-[var(--secondary-color)] disabled:border-[var(--background-color)] disabled:text-[var(--background-color)]
                  btn-sm md:btn-md"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  <i class="fa-solid fa-chevron-left"></i> Back
                </button>
                <button
                  type="button"
                  className="btn bg-[var(--secondary-color)] border-[var(--secondary-color)] text-[var(--background-color)] btn-sm md:btn-md"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? (
                    <>
                    Finish <i className="fa-solid fa-flag text-white"></i>
                    </>
                  ) : (
                    <>
                      Next <i class="fa-solid fa-chevron-right"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:w-1/4">
            <SummaryCard
              teacher={teacher}
              sessionType={sessionType}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              sessionPrice={sessionPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
