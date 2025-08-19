import { useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setTeachers } from "../store/TeachersSlice";
import { setStudents } from "../store/StudentsSlice";

function Network() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    const getData = async () => {
      try {
        // all teachers
        const teachersSnap = await getDocs(collection(db, "teachers"));
        const teachersData = teachersSnap.docs.map((doc) => {
          const data = doc.data();
          if (data.createdAt && typeof data.createdAt.toDate === 'function') {
            data.createdAt = data.createdAt.toDate().toISOString();
          }
          return { id: doc.id, ...data };
        });
        dispatch(setTeachers(teachersData));

        // all users
        const studentsSnap = await getDocs(collection(db, "students"));
        const studentsData = studentsSnap.docs.map((doc) => {
          const data = doc.data();
          if (data.createdAt && typeof data.createdAt.toDate === 'function') {
            data.createdAt = data.createdAt.toDate().toISOString();
          }
          return { id: doc.id, ...data };
        });
        dispatch(setStudents(studentsData));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getData();
  }, [dispatch, currentUser]);

  return <></>;
}

export default Network;