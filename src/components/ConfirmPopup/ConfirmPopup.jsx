
function ConfirmPopup({title, description, buttonTitle, buttonFunction, close}) {
  return (
    <>
    <div className="fixed inset-0 bg-[#0000004d] bg-opacity-25 z-100 overflow-y-auto h-full w-full flex items-center justify-center">
        
        <div className="confirm-popup relative bg-[var(--background-color)] shadow-[var(--box-shadow)] rounded-[var(--border-radius)] p-12 flex flex-col items-center">
            
            <h3 className="text-[var(--dark-color)] font-bold text-[length:var(--title-font-size)] mb-2">{title}</h3>
            <p calssName="text-[var(--main-text)] leading-[var(--line-height)]">{description}</p>

            <button onClick={buttonFunction} className="btn bg-[var(--secondary-color)] text-white mt-5">{buttonTitle}</button>

            <div onClick={close} className="close-icon absolute top-3 right-3 w-[35px] h-[35px] bg-[var(--secondary-color)] text-white flex justify-center items-center rounded-full cursor-pointer">
                <i className="fa-solid fa-xmark "></i>
            </div>
        </div>
    </div>
    </>
  )
}

export default ConfirmPopup