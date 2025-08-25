import { Link } from "react-router-dom";
import success from "../../assets/images/success.png";

function SuccessModal({ setShowModal }) {
  return (
    <dialog id="success_modal" className="modal modal-open">
      <div className="modal-box text-center"  data-aos="zoom-in-up">
        <div className="flex justify-center items-center gap-2">
          <h3 className="font-bold text-lg text-green-600">
            Payment Successful!
          </h3>
          <div className="w-8">
            {" "}
            <img src={success} alt="success" />
          </div>
        </div>

        <p className="py-4">Your appointment has been successfully booked!</p>
        <div className="modal-action w-full">
          <form method="dialog" className="w-full">
            <div className="flex justify-between w-full">
              <button
                className="btn btn-outline border-1 text-[var(--secondary-color)] border-[var(--secondary-color)] capitalize hover:bg-[var(--secondary-color)] hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>

              <Link
                className="btn btn-outline border-1 border-[var(--secondary-color)] capitalize bg-[var(--secondary-color)] text-white hover:text-[var(--secondary-color)] hover:bg-[var(--card-background)]"
                to="/myBookings"
              >
                go to my booking
              </Link>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default SuccessModal;
