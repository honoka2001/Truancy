import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { RepositoryFactory } from "../repositories/RepositoryFactory";

const userRepository = RepositoryFactory.get("users");
const motivationRepository = RepositoryFactory.get("motivations");

function Motivation() {
  const [userData, setUserData] = useState([]);
  const [motivations, setMotivation] = useState([{ motivation: 0 }]);

  async function userPost(uid) {
    try {
      const res = await userRepository.post({
        user: {
          uid: uid,
        },
      });
      console.log(res);
      setUserData(res.data);
      getMotivationShow(res.data.id);
      console.log(motivations);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMotivationShow(id) {
    try {
      const res = await motivationRepository.showGet(id);
      console.log(res);
      setMotivation(res.data);
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
