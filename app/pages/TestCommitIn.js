import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
import firebase from "../components/firebase";

export default function CommitModal(props) {
  const [definition, setDefinition] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [count, setCount] = useState(1);
  const [userData, setUserData] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleDefinitionChange = (e) => {
    setDefinition(e.target.value);
  };

  async function userPost(uid) {
    try {
        const res = await userRepository.post({
            user: {
                uid: uid,
            },
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      setUserData(user);
      userPost(user.uid);
    });
  }, []);

  const commitRepository = RepositoryFactory.get("commits");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await commitRepository.post({
        commit: {
          user_id: userData,
          definition: definition,
          message: message,
          date: date,
          count: count,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <input type="date" name="date" />
        <input type="number" name="count" />
        <input type="submit" value="登録" />
      </form>
    </div>
  );
}
