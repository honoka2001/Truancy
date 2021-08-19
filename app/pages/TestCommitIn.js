import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
import firebase from "../components/firebase";
import InputCommit from "../components/commits/InputCommit";
import CommitIndex from "../components/commits";

const userRepository = RepositoryFactory.get("users");

export default function CommitModal(props) {
  const [userData, setUserData] = useState("");
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
      setUserData(user);
      userPost(user.uid);
    });
  }, []);

  return (
    <div>
      <CommitIndex userData={userData} userId={userId} />
      <InputCommit userId={userId} />
    </div>
  )
    
}
