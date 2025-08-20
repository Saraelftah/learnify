import terms from "../../assets/images/assignment.png";

function TermsModal() {
  return (
    <>
      <div>
        <button
          type="button"
          className="btn
                       bg-white  text-[var(--secondary-color)]
                        hover:text-white hover:bg-[var(--secondary-color)] transition-colors duration-300 shadow-md border-[var(--secondary-color)]"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Read Terms & Conditions
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex gap-2 items-center">
              <div className="w-10">
                <img src={terms} alt="terms" />
              </div>
              <h3 className="font-bold text-lg text-[var(--primary-color)]">
                Our Terms & Conditions
              </h3>
            </div>

            <div className="py-4 ">
              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                I confirm that all information and documents I provide are
                accurate and truthful.
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                I agree that the platform has the right to review my profile and
                documents before approving me as a teacher.
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                I agree not to share or upload any inappropriate, offensive, or
                misleading content.
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                I agree to conduct myself professionally and respectfully when
                interacting with students.
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                I agree that the platform reserves the right to suspend or
                remove my account if I violate the rules or provide false
                information.
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                I understand that lesson prices, commissions, and payment
                methods are subject to the platform’s policies.
              </p>
              <br></br>

              <p className="flex items-baseline text-sm">
                <i className="fa-regular fa-circle-dot mr-1 text-[var(--secondary-color)]"></i>
                I acknowledge that my approval as a teacher is not guaranteed
                and depends on the platform’s review process.
              </p>
            </div>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_1").close()}
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
    </>
  );
}

export default TermsModal;
