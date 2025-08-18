import { useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setTeachers } from "../store/TeachersSlice";
import { setStudents } from "../store/StudentsSlice";

function Network() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    const getData = async () => {
      try {
        // get teachers from database - all users can read it
        const teachersSnap = await getDocs(collection(db, "teachers"));
        const teachersData = teachersSnap.docs.map((doc) => {
          const data = doc.data();
          if (data.createdAt) {
            data.createdAt = data.createdAt.toDate().toISOString();
          }
          return { id: doc.id, ...data };
        });
        dispatch(setTeachers(teachersData));

        // get students from data base - only admin can read it
        if (currentUser && currentUser.role === "admin") {
          const studentsQuery = query(
            collection(db, "users"),
            where("role", "==", "student")
          );
          const studentsSnap = await getDocs(studentsQuery);
          const studentsData = studentsSnap.docs.map((doc) => {
            const data = doc.data();
            if (data.createdAt) {
              data.createdAt = data.createdAt.toDate().toISOString();
            }
            return { id: doc.id, ...data };
          });
          dispatch(setStudents(studentsData));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getData();
  }, [dispatch, currentUser]);

  return <></>;
}

export default Network;