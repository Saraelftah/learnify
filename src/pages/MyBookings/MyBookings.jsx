import { useDispatch, useSelector } from "react-redux";
import ChooseTeacher from "../ChooseTeacher/ChooseTeacher";
import studentImage from "../../assets/images/view-3d-young-school-student.jpg";
import { useEffect } from "react";
import { fetchBookings } from "../../store/BookSlice";
function MyBookings() {
  const user = useSelector((state) => state.users.currentUser);
  const bookings = useSelector((state) => state.bookings.bookings);
  const userBookings = bookings.filter(
    (booking) => booking.student.studentId === user?.uid
  );
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);



  // Check if user is logged in
  if (!user) {
    return "Please log in to view your bookings.";
  }
console.log('User Bookings: ', userBookings);
console.log('user: ', user);

  return (
    <div className="p-6 mt-30">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col align-middle  gap-y-4">
          <div className="avatar avatar-online w-70 h-70">
            <img src={studentImage} alt="Student profile image" />
          </div>
          {/* Student Info */}
          <div className="student-info">
            <span className="text-xl font-bold ">Student Name: </span>
            <span className="font-semibold text-xl">{user.name}</span>
          </div>
          <div>
            <span className="font-bold">You have </span>
            <span className="font-semibold">{userBookings.length}</span>
            <span className="font-bold"> lessons</span>
          </div>
        </div>
        {/* Instructions for attending your online class*/}
        <div className="instructions card bg-base-100 border border-base-300 shadow-md p-6 md:p-8 gap-y-3 w-1/2">
          <span className="text-lg font-semibold text-[var(--primary-color)]">
            Instructions:
          </span>
          <p className="mt-2">
            1- Please ensure you have a stable internet connection and a quiet
            environment for your online class.
          </p>
          <p>
            2- Make sure to enter the meeting 5 minutes early to ensure
            everything is set up correctly.
          </p>
          <p>
            3- If you have any questions or need to reschedule, please contact
            your teacher directly.
          </p>
          <p className="font-semibold ">
            (If you need to cancel or reschedule, please do so at least 24 hours
            in advance)
          </p>
          <p>
            4- If you have any issues joining the class, please contact support
            at
          </p>
        </div>
      </div>
      {userBookings.length === 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">No bookings found</h2>
          <p>
            You have no bookings yet. Please choose a teacher to book an
            appointment.
          </p>
          <ChooseTeacher />
        </div>
      ) : (
        <>
          {/* Student Courses */}
          <div className="space-y-4 mt-10">
            <h2 className="text-xl font-bold mb-4">My Bookings</h2>
            {userBookings.map((b) => (
              <div key={b.id} className="p-4 shadow ">
                <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="avatar w-30 ">
                    <img
                      src={b.teacherImage}
                      alt={b.teacherName}
                      className="w-30 h-30  mb-2"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <p>
                      <strong>{b.teacherName}</strong> ({b.subject})
                    </p>
                    <p>{b.date} - {b.time}</p>
                    <p>Type: {b.sessionType}</p>
                    <p>Status: {b.status}</p>
                  </div>
                </div>
                    <div>
                      <a
                        href={b.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-[var(--secondary-color)] text-[var(--background-color)] mt-2"
                      >
                        Join Session
                      </a>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyBookings;
