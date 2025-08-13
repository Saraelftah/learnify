import { useAuthState } from 'react-firebase-hooks';
import { auth, db } from '../../firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Navigate } from "react-router-dom";
import Loader from '../components/Loader/Loader';


function RoleRoute({allow = [], children}) {
    const[user, loading] = useAuthState(auth);
    const[role, setRole] = useState(null);
    const[busy, setBusy] = useState(true);

    useEffect(() => {
        const run = async() => {
            if(!user) {
                setBusy(false);
                return;
            }
            const snap = await getDoc(doc(db,"users",user.uid));
            if(!snap.exists()) {
                setRole(null);
                setBusy(false);
                return;
            }
            setRole(snap.data().role);
            setBusy(false);
        };
        run();
    },[user]);
    if(loading || busy) return <Loader/>
    if(!user) return < Navigate to="/login" replace />;
    if(!allow.includes(role)) return <Navigate to="unauthorized" replace />
    
  return (
    children
  )
}

export default RoleRoute