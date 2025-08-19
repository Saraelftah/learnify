import { useSelector } from 'react-redux';
import { deleteStudent } from '../../store/StudentsSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';

function AdminStudents() {
    const students = useSelector((state) => state.students.students);
    const dispatch = useDispatch();
    console.log(students)
    const [showPopup, setShowPopup] = useState(false);
    const [studentId, setStudentId] = useState(null);

    const handleOpenPopup = (studentId) => {
      setStudentId(studentId);
      setShowPopup(true);
      
    };
    const handleClosePopup = () => {
      setStudentId(null);
      setShowPopup(false);
    };
    const handleDelete = (studentId) => {
      if (studentId) {
      dispatch(deleteStudent(studentId));
      handleClosePopup();
    }
    }

  
  return (
    <>
      <div className="admin-students capitalize">
      <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] mb-5">Students Management</h3>
      <h4 className="text-lg">we have <span className="text-[var(--secondary-color)] font-bold">{students?.length}</span> students</h4>
      <div className="teachers-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center mt-5">
        {students?.map((student)=>(
          <div className="student relative shadow-[var(--box-shadow)] flex items-center gap-3 p-5 rounded-[var(--border-radius)]" 
          key={student.id}>
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center border-2 border-[var(--secondary-color)] text-[var(--secondary-color)]"> 
                <i className="text-2xl fa-solid fa-user"></i>
            </div>
            <div className="">
              <h3 className="text-[var(--primary-color)] font-bold">{student.name}</h3>
              <p className="text-[var(--text-color)] text-sm">{student.phone}</p>
            </div>

            {/* remove dropdown */}
            <div className="dropdown dropdown-end absolute top-2 right-2">
              <div tabIndex={0} role="button" className="text-[var(--secondary-color)] cursor-pointer">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <ul tabIndex={0} className="dropdown-content menu w-fit shadow-sm bg-[var(--admin-bg-color)]">
                <li>
                  <button className="bg-transparent" 
                  onClick={() => { 
                    if (document.activeElement) {
                    document.activeElement.blur();
                    }
                    handleOpenPopup(student.id)
                    
                  }}
                    >Remove</button>
                </li>
              </ul>
            </div>
            {/* popup confirmation */}
            {showPopup && (
            <ConfirmPopup 
              title="delete student"
              description="are you sure you want to delete this student"
              buttonTitle="delete"
              buttonFunction={() => handleDelete(studentId)}
              close={handleClosePopup}
            />
            )}
          </div>
        ))}
      </div>
    </div>

    </>
  )
}

export default AdminStudents