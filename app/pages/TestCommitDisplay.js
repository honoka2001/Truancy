import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
import firebase from "../components/firebase";
import CommitDataTable from "../components/commits/CommitDataTable";

const userRepository = RepositoryFactory.get("users");

export default function CommitModal() {
  const [userId, setUserId] = useState("");

  async function userPost(uid) {
    try {
      const res = await userRepository.post({
        user: {
          uid: uid,
        },
      });
      console.log(res);
      setUserId(res.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      userPost(user.uid);
    });
  }, []);

  return (
    <div>
        <CommitDataTable userId={userId} />
    </div>
  )
    
}
