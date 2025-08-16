import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

function RoleRoute({ allow = [], children }) {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [roleFetched, setRoleFetched] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      // If the user is logged out, stop fetching and set state
      if (!user) {
        setRole(null);
        setRoleFetched(true);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (!snap.exists()) {
          setRole(null);
        } else {
          setRole(snap.data().role);
        }
      } catch (error) {
        console.error("Error fetching user role: ", error);
        setRole(null);
      } finally {
        setRoleFetched(true);
      }
    };
    // Fetch the role only if the user object is available and loading is complete
    if (user && !loading) {
      fetchRole();
    }
    // If loading is finished and there's no user, we are also done.
    if (!user && !loading) {
      setRoleFetched(true);
    }
  }, [user, loading]);
  if (loading || !roleFetched) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  if (!allow.includes(role)) return <Navigate to="/unauthorized" replace />;

  return children;
}

export default RoleRoute;
