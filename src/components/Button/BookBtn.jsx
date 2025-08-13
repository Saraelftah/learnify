// import React from 'react'
// import { doc } from 'firebase/firestore'
// import { setDoc } from 'firebase/firestore'
// import { db } from '../../firebase/firebaseConfig'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedTeacher } from '../../store/BookedTeacherSlice'
function BookBtn({teacher}) {
const dispatch = useDispatch()
const navigate = useNavigate()

const handleBook = () => {
    // Set the selected teacher in the Redux store.
    dispatch(setSelectedTeacher(teacher))
    navigate(`/payment/${teacher.id}`);
    }

   return (
    <button
      onClick={handleBook}
      className="btn border-[var(--secondary-color)] bg-white text-[var(--secondary-color)] w-fit"
    >
        Book Now
    </button>
    
  )
}

export default BookBtn