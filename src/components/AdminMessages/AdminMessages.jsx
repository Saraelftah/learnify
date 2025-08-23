import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";

function AdminMessages() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const getData = async () => {
          try {
            // all teachers
            const messageSnap = await getDocs(collection(db, "messages"));
            const messageData = messageSnap.docs.map((doc) => {
              const data = doc.data();
              if (data.createdAt && typeof data.createdAt.toDate === 'function') {
                data.createdAt = data.createdAt.toDate().toISOString();
              }
              return { id: doc.id, ...data };
            });
            console.log(messageData)
            setMessages(messageData);
        }
        catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    getData();
},[])

  return (
    <>
        <div className="messages capitalize text-[var(--text-color)]">
            <h3 className="text-[var(--dark-color)] text-[length:var(--title-font-size)] font-bold mb-5">Messages</h3>
            <table className="table w-full rouded-[var(--border-radius)]">
                <thead>
                <tr className="bg-[var(--admin-bg-color)] rounded-[var(--border-radius)] text-[var(--text-color)] hidden md:table-row">
                    <th>name</th>
                    <th>email</th>
                    <th>subject</th>
                    <th>message</th>
                </tr>
                </thead>
                <tbody>
                    {messages?.map((message)=>(
                        <tr key={message.id} className="bg-[var(--admin-even)] odd:bg-[var(--admin-odd)]  flex flex-col md:table-row mb-4">
                            <td>{message.firstName} {message.lastName}</td>
                            <td>{message.email}</td>
                            <td>{message.subject}</td>
                            <td>{message.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
            
        </div>
    </>
  )
}

export default AdminMessages