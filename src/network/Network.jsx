import { useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setTeachers } from "../store/TeachersSlice";
import { setStudents } from "../store/StudentsSlice";

function Network() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const teachersQuery = collection(db, "teachers");
        const studentsQuery = query(collection(db, "users"), where("role", "==", "student"));

        // 💡 جلب البيانات في نفس الوقت باستخدام Promise.all
        const [teachersSnap, studentsSnap] = await Promise.all([
          getDocs(teachersQuery),
          getDocs(studentsQuery)
        ]);
                console.log("Students from Firestore:", studentsSnap.docs.map(doc => doc.data()));

        // معالجة بيانات المعلمين
        const teachersData = teachersSnap.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            createdAt: docData.createdAt?.toDate().toISOString() || null,
          };
        });

        // معالجة بيانات الطلاب
        const studentsData = studentsSnap.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            createdAt: docData.createdAt?.toDate().toISOString() || null,
          };
        });

        // 💡 إرسال البيانات إلى Redux
        dispatch(setTeachers(teachersData));
        dispatch(setStudents(studentsData));

      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [dispatch]);

  return <></>;
}

export default Network;