function TeacherBenefits({iconClass, title, description}) {
  return (
    <>
        <div className="teacher-benefits-item flex gap-2 items-center mb-1">
            <i className={`${iconClass} text-[var(--secondary-color)] text-[length:30px]`}></i>
            <div>
            <h4 className="text-[var(--primary-color)] font-bold">{title}</h4>
            <p className="text-[var(--text-color)] text-[length:var(--font-size-xs)]">{description}</p>
            </div>
        </div>
    </>
  )
}
export default TeacherBenefits