import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { RepositoryFactory } from "../repositories/RepositoryFactory";

const userRepository = RepositoryFactory.get("users");

function Motivation() {
  const [userData, setUserData] = useState([]);

  async function userPost(uid) {
    try {
      const res = await userRepository.post({
        user: {
          uid: uid,
        },
      });
      console.log(res);
      setUserData(res.data);
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

    </div>
  );
}

export default Motivation;
