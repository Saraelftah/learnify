import AdminAnalysis from "../AdminAnalysis/AdminAnalysis";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import toast from "react-hot-toast";

function AdminOverview() {
  const [pending, setPending] = useState([]);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    const q = query(
      collection(db, "newTeachers"),
      where("submitted", "==", true),
      where("approved", "==", false)
    );

    const snap = await getDocs(q);
    setPending(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    load();
  }, []);

  // for approved teacher
  const approveTeacher = async (teacherId) => {
    try {
      setBusyId(teacherId);

      const newTeacherRef = doc(db, "newTeachers", teacherId);
      const userRef = doc(db, "users", teacherId);

      const [newTeacherSnap, userSnap] = await Promise.all([
        getDoc(newTeacherRef),
        getDoc(userRef),
      ]);
      if (!newTeacherSnap.exists() || !userSnap.exists()) {
        toast.error("Teacher data not found");
        return;
      }

      const newTeacher = newTeacherSnap.data();
      // const user = userSnap.data();

      const publicDoc = {
        Image: newTeacher.Image || "https://i.ibb.co/placeholder.png",
        name: newTeacher.name || "Unknown",
        subject: newTeacher.subject || "",
        gradeLevel: newTeacher.gradeLevel || "",
        rating: 0,
        averageRating: null,
        lessonType: newTeacher.lessonType || "Online",
        hourlyRate: newTeacher.hourlyRate ?? null,
        firstLessonFree: !!newTeacher.firstLessonFree,
        overview: newTeacher.overview || "",
        availableDates: Array.isArray(newTeacher.availableDates)
          ? newTeacher.availableDates
          : [],
        availableGroupDates: [],
        reviews: [],
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "teachers", teacherId), publicDoc);
      await updateDoc(userRef, { role: "teacher" });

      await updateDoc(newTeacherRef, {
        approved: true,
        approvedAt: serverTimestamp(),
      });
      await deleteDoc(newTeacherRef);

      toast.success("Teacher approved successfully");
      setPending((prev) => prev.filter((t) => t.id !== teacherId));
    } catch (err) {
      console.error(err);
      toast.error("Approve failed");
    } finally {
      setBusyId(null);
    }
  };

  // for rejected teacher
  const rejectTeacher = async (teacherId) => {
    try {
      setBusyId(teacherId);
      const newTeacherRef = doc(db, "newTeachers", teacherId);
      const userRef = doc(db, "users", teacherId);

      await deleteDoc(newTeacherRef);
      await updateDoc(userRef, { role: "teacherRejected" });
      toast.success("Teacher rejected");
      setPending((prev) => prev.filter((t) => t.id !== teacherId));
    } catch (err) {
      console.error(err);
      toast.error("Reject failed");
    } finally {
      setBusyId(null);
    }
  };

  if (!pending.length) {
    return (
      <>
        <div className="flex flex-col ">
          <AdminAnalysis />
          <div className="no-pending ">
            <h1 className="text-xl font-bold mb-4">Pending Teachers</h1>
            <p>No submissions yet.</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col">
        <AdminAnalysis />

        <h1 className="text-xl font-bold mb-4">Pending Teachers</h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Rate</th>
                <th>Lesson Type</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((t) => (
                <tr key={t.id}>
                  <td>
                    {t.Image ? (
                      <img
                        src={t.Image}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{t.name}</td>
                  <td>{t.subject || "—"}</td>
                  <td>{t.gradeLevel || "—"}</td>
                  <td>{t.hourlyRate ?? "—"}</td>
                  <td>{t.lessonType || "—"}</td>
                  <td>{String(!!t.submitted)}</td>
                  <td className="flex gap-2">
                    {/* approve button */}
                    <button
                      className="btn bg-[var(--success-color)] text-white btn-sm"
                      onClick={() => approveTeacher(t.id)}
                      disabled={busyId === t.id}
                    >
                      {busyId === t.id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "Approve"
                      )}
                    </button>

                    {/* reject button */}
                    <button
                      className="btn bg-[var(--error-color)] text-white btn-sm"
                      onClick={() => rejectTeacher(t.id)}
                      disabled={busyId === t.id}
                    >
                      {busyId === t.id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "Reject"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminOverview;
