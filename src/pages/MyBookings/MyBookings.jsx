import { useSelector } from "react-redux";
import ChooseTeacher from "../ChooseTeacher/ChooseTeacher";

function MyBookings() {
  const bookings = useSelector((state) => state.bookings.items);

  return (
    <div className="p-6 mt-50">
      {bookings.length === 0 ? (
        <ChooseTeacher />
      ) : (
        <ul className="space-y-4">
          <h2 className="text-xl font-bold mb-4">My Bookings</h2>
          {bookings.map((b) => (
            <div key={b.id} className="p-4 shadow rounded">
                <div className="avatar w-24 ">
                <img
                  src={b.teacherImage}
                    alt={b.teacherName}
                    className="w-16 h-16 rounded-full mb-2"
                />
                </div>
              <p>
                <strong>{b.teacherName}</strong> ({b.subject})
              </p>
              <p>
                {b.date} - {b.time}
              </p>
              <p>Type: {b.sessionType}</p>
              <p>Price: ${b.price.toFixed(2)}</p>
              <p>Status: {b.status}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBookings;
