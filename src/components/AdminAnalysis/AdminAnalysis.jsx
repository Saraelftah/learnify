import { useSelector } from "react-redux";
    

function AdminAnalysis() {
    const teachers = useSelector((state) => state.teachers.teachers);
    const students = useSelector((state) => state.students.students);
  return (
    <>
        <div className="admin-analysis w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shadow-[var(--box-shadow)] capitalize mb-10  p-5">
            <div className="item text-center">
                <h4 className="text-[#f7a163] font-bold text-2xl">
                    {teachers?.reduce((acc, current)=>acc+Number(current.earning || 0),0)}
                </h4>
                <p className="text-[var(--text-color)] mt-2">earnings</p>
            </div>
            <div className="item text-center">
                <h4 className="text-[#eb94de] font-bold text-2xl">{teachers.length}</h4>
                <p className="text-[var(--text-color)] mt-2">teachers</p>
            </div>
            <div className="item text-center">
                <h4 className="text-[#8c98e4] font-bold text-2xl">{students.length}</h4>
                <p className="text-[var(--text-color)] mt-2">students</p>
            </div>
            <div className="item text-center">
                <h4 className="text-[#76bfa4] font-bold text-2xl">
                    {teachers?.reduce((acc, current)=>acc+Number(current.sessions || 0),0)}
                </h4>
                <p className="text-[var(--text-color)] mt-2">sessions</p>
            </div>
        </div>
    </>
  )
}

export default AdminAnalysis