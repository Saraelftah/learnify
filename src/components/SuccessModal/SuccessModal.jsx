function SuccessModal({ setShowModal }) {
  return (
    <dialog id="success_modal" className="modal modal-open">
      <div className="modal-box text-center">
        <h3 className="font-bold text-lg text-green-600">
          Payment Successful! 🎉
        </h3>
        <p className="py-4">Your appointment has been successfully booked.</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default SuccessModal;
