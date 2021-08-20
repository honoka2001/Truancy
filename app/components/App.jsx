import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const userRepository = RepositoryFactory.get("users");

const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
};

function App() {
    const [userData, setUserData] = useState([]);

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

    async function login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
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
                <StyledFirebaseAuth
                    onClick={login}
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            )}
        </div>
    );
}

export default App;
