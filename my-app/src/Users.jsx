import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDjFFlzbfo6GQ9cj_O7ROeIaNCO0drJFr8",
  authDomain: "teste-1e9bd.firebaseapp.com",
  projectId: "teste-1e9bd",
});

export const Users = () => {
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users")

  async function deleteUser(id){
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  // faz a busca pelos dados na base de dados
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [userCollectionRef]);

  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <div>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <button onClick={() => deleteUser(user.id)}>Deletar</button>
            </div>
          )
        })}
      </ul>

    </div>
  );
}