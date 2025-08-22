import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyBookings() {
  const user = useSelector((state) => state.users.currentUser);
  const students = useSelector((state) => state.students.students);
  const currentStudent = students?.find((s) => s.id === user?.uid);


  return (
    <section className="my-booking mt-[120px] capitalize mb-[50px]">
      <div className="container">
        <div className="shadow-[var(--box-shadow)] p-10 rounded-[var(--border-radius)]" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 ">

          <div className="col-span-1 justify-self-center lg:justify-self-start" >
            <div className="student-placeholder w-50 h-50 rounded-full bg-[var(--primary-color)] text-white flex justify-center items-center">
              <h3 className="text-6xl">
                {currentStudent?.name.split(" ").map(name => name.charAt(0).toUpperCase()).join('')}
              </h3>
            </div>
            <h4 className="text-center pt-5 w-50 text-[var(--primary-color)] text-xl font-bold">{currentStudent?.name}</h4>
          </div>

          {/* Instructions for attending your online class*/}
          <div className="instructions col-span-3">
            <h4 className="text-xl font-bold text-[var(--dark-color)] mb-5">
              Instructions:
            </h4>
            <div className="mt-2 flex items-start">
              <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
              <p className="text-[var(--text-color)]">Make sure you have a stable internet connection to avoid interruptions.</p> 
            </div>
            <div className="mt-2 flex items-start">
              <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
              <p className="text-[var(--text-color)]">Make sure to enter the meeting 5 minutes early to ensure everything is set up correctly.</p>
            </div>
            <div className="mt-2 flex items-start">
              <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
              <p className="text-[var(--text-color)]">Choose a quiet environment with minimal distractions during the class.</p>
            </div>
            <div className="mt-2 flex items-start">
              <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
              <p className="text-[var(--text-color)]">Keep a notebook, pen, and any required course materials with you.</p>
            </div>
            <div className="mt-2 flex items-start">
              <i className="fa-regular fa-square-check text-[var(--secondary-color)] text-2xl mr-2"></i>
              <p className="text-[var(--text-color)]">If you have any issues joining the class, please contact <Link className="text-[var(--primary-color)] font-bold" to="/contact">support</Link></p>
            </div>
            
          </div>
        </div>

        <hr className="border-t-2 border-[var(--hr-color)] my-10 rounded-full" />


        {!currentStudent?.bookings ? (
          <div className="">
            <h2 className="text-[var(--dark-color)] text-2xl font-bold mb-5">Bookings:</h2>
            <p className="text-[var(--text-color)]">
              you have <span>0</span> bookings. go to <Link to="/search" className="text-[var(--primary-color)] font-bold">teachers</Link> page to make an appointment.
            </p>
          </div>
        ) : (
          
          <div className="bookings ">
            <h3 className="text-[var(--dark-color)] text-2xl font-bold mb-5">Bookings:</h3>
          {currentStudent?.bookings?.map((booking)=>(
            
            <div className="flex flex-col md:flex-row items-center justify-between shadow-[var(--box-shadow)] rounded-[var(--border-radius)] px-5 py-5 md:py-2 border-l-10 border-[var(--light-primary-color)]" key={booking.createdAt}>
              <div className="teacher flex items-center gap-5">
                <div>
                  <img className="!w-25 !h-25 rounded-full" src={booking.teacherImage} alt="teacher"/>
                </div>
                <div>
                  <h4 className="text-[var(--dark-color)] text-lg ">{booking.teacherName}</h4>
                  <p className="">{booking.subject}</p>
                </div>
                
              </div>

              <div className="h-0.5 w-full bg-[var(--hr-color)] md:h-30 md:w-0 md:border-l-2 md:bg-transparent md:border-[var(--hr-color)] my-5 md:my-0"></div>
              
              <div className="date">
                <div className="flex items-center gap-2 mb-2">
                  <i class="fa-regular fa-calendar text-[var(--secondary-color)] text-2xl"></i>
                  <p className="font-bold">{booking.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <i class="fa-regular fa-clock text-[var(--secondary-color)] text-2xl"></i>
                  <p>{booking.time}</p>
                </div>
              </div>

              <div className="h-0.5 w-full bg-[var(--hr-color)] md:h-30 md:w-0 md:border-l-2 md:bg-transparent md:border-[var(--hr-color)] my-5 md:my-0"></div>

              <div className="type">
                <p>{booking.sessionType} session</p>
              </div>

              <div className="h-0.5 w-full bg-[var(--hr-color)] md:h-30 md:w-0 md:border-l-2 md:bg-transparent md:border-[var(--hr-color)] my-5 md:my-0"></div>


              <div className="">
                <a href={booking.meetingLink}
                className="bg-[var(--primary-color)] text-white px-5 py-2 rounded-[var(--border-radius)] border-1 border-[var(--primary-color)] hover:bg-[var(--background-color)] hover:text-[var(--primary-color)]"
                >join meeting</a>
              </div>
            </div>
          ))}

          </div>
          
        )}
        </div>
      </div>
    </section>
  );
}

export default MyBookings;
