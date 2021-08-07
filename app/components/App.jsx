import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
const userRepository = RepositoryFactory.get("users");

function App() {
  const [userData, setUserData] = useState([]);

  async function userPost() {
    try {
      const res = await userRepository.post({
        user: {
          uid: user.uid,
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
      userPost();
    });
  }, []);

  async function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    userPost();
  }

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <div className="App">
      <p className="App-intro">UID: {userData && userData.uid}</p>

      {userData ? (
        <button onClick={logout}>Google Logout</button>
      ) : (
        <button onClick={login}>Google Login</button>
      )}
    </div>
  );
}

export default App;
