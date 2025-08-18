import { useSelector } from 'react-redux';
import { deleteTeacher } from '../../store/TeachersSlice';
import { useDispatch } from 'react-redux';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import { useState } from 'react';

function AdminTeachers() {
    const teachers = useSelector((state) => state.teachers.teachers);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [teacherId, setTeacherId] = useState(null);

    const handleOpenPopup =(teacherId) => {
      setTeacherId(teacherId)
      setShowPopup(true)
    }
    const handleClosePopup =() => {
      setTeacherId(null)
      setShowPopup(false)
    }

    const handleDelete = (teacherId) => {
      if (teacherId) {
        dispatch(deleteTeacher(teacherId));
        handleClosePopup()
      }
  };
  return (

    <div className="admin-teachers capitalize">
      <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] mb-5">Teachers Management</h3>
      <h4 className="text-lg">we have <span className="text-[var(--secondary-color)] font-bold">{teachers.length}</span> teachers</h4>
      <div className="teachers-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center mt-5">
        {teachers.map((teacher)=>(
          <div className="teacher relative shadow-[var(--box-shadow)] flex items-center gap-3 p-5 rounded-[var(--border-radius)]" 
          key={teacher.id}>
            <div className="w-[70px] h-[70px] rounded-full"> 
                <img className="rounded-full " src={teacher.Image} alt={teacher.name}/>
            </div>
            <div className="">
              <h3 className="text-[var(--primary-color)] font-bold">{teacher.name}</h3>
              <p className="text-[var(--text-color)] text-sm">{teacher.subject}</p>
            </div>

            {/* remove dropdown */}
            <div className="dropdown dropdown-end absolute top-2 right-2">
              <div tabIndex={0} role="button" className="text-[var(--secondary-color)] cursor-pointer">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <ul tabIndex={0} className="dropdown-content menu z-1 w-fit shadow-sm bg-[var(--admin-bg-color)]">
                <li className='bg-transparent'>
                  <button onClick={()=>{
                    if (document.activeElement) {
                    document.activeElement.blur();
                    }
                    handleOpenPopup(teacher.id)}}
                    >Remove</button>
                </li>
              </ul>
            </div>

            
          </div>

          
        ))}

        {/* popup confirmation */}
            {showPopup && (
            <ConfirmPopup 
              title="delete teacher"
              description="are you sure you want to delete this teacher"
              buttonTitle="delete"
              buttonFunction={() => handleDelete(teacherId)}
              close={handleClosePopup}
            />
          )}
      </div>
    </div>

  )
}

export default AdminTeachers