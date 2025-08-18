import { useEffect } from 'react'
import studentImage from '../../assets/images/view-3d-young-school-student.jpg'
import MyBookings from'../MyBookings/MyBookings'
function StudentProfile() {

  return (
    <>
    <div className='mt-30 p-10'>
     <div className='avatar w-60'>
      <img src={studentImage} alt="Student profile image" />
      </div>        
       {/* Student Info */}
       <div className="student-info">
        <h3 className="text-2xl font-bold">Student Name</h3>
        <p>Year: </p>
        </div>
        {/* Student Courses */}
        <div>
          <h2>My Appointment</h2>
          <MyBookings />
        </div>
    </div>
    </>
    
  )
}

export default StudentProfile