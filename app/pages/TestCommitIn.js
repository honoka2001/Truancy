import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
import firebase from "../components/firebase";

const userRepository = RepositoryFactory.get("users");
const commitRepository = RepositoryFactory.get("commits");

export default function CommitModal(props) {
  const [definition, setDefinition] = useState("math");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [count, setCount] = useState(1);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  
  const handleDefinitionChange = (e) => {
    setDefinition(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleCountChaneg = (e) => {
    setCount(e.target.value);
  }

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
      console.log(user);
      setUserData(user);
      userPost(user.uid);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await commitRepository.post({
        commit: {
          user_id: userId,
          definition_id: 1,
          message: message,
          date: date,
          count: count,
        },
      });
      console.log(res);
      // console.log(userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" onChange={handleMessageChange} />
        <input type="date" name="date" onChange={handleDateChange} />
        <input type="number" name="count" onChange={handleCountChaneg} />
        <input type="submit" value="登録" />
      </form>
    </div>
  );
}
