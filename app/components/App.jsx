import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { RepositoryFactory } from "../repositories/RepositoryFactory";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useRouter } from "next/router";
import top from "../styles/topPage.module.css";

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
    const router = useRouter();
    const [userData, setUserData] = useState([]);

    async function userPost(uid) {
        try {
            const res = await userRepository.post({
                user: {
                    uid: uid,
                },
            });
            router.push("/my_page");
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
            {/* <p className="App-intro">UID: {userData && userData.uid}</p> */}

            {userData ? (
                <button onClick={logout}>Google Logout</button>
            ) : (
                <div>
                    <header className={top.header}>
                        <div className={top.center}>
                            <img
                                className={top.logo}
                                src="/truancy_logo.png"
                                alt="logo"
                            />
                            <h1 className={top.title}>Truancy</h1>

                            <StyledFirebaseAuth
                                onClick={login}
                                uiConfig={uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                        </div>
                    </header>
                    <div className="main">
                        <div className={top.contents}>
                            <div className={top.contentsWrp}>
                                <div className={top.imgContents}>
                                    <img
                                        className={top.img}
                                        src="/Goal-bro.svg"
                                        alt="モチベーションを管理し物事の継続をサポート"
                                    />
                                </div>
                                <div className={top.textContents}>
                                    <h2 className={top.textContentsTitle}>
                                        モチベーションを管理し
                                        <br />
                                        物事の継続をサポート
                                    </h2>
                                    <p className={top.textContentsDescription}>
                                        Truncyはあなたの日々の受験勉強やダイエットなど様々な努力を継続するために
                                        <br />
                                        あなたの努力を記録し管理して、サポートします。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={top.contents}>
                            <div className={top.contentsWrp}>
                                <div className={top.textContentsLeft}>
                                    <h2 className={top.textContentsTitle}>
                                        あなたの日々の努力を記録しよう
                                    </h2>
                                    <p className={top.textContentsDescription}>
                                        1コミットの定義を決めることが出来ます。
                                        <br />
                                        Ex. 数学 :
                                        テキストの大問１つで１コミット
                                        <br />
                                        また一日の目標コミット数を設定し、あなたの日々の努力を記録しましょう
                                    </p>
                                </div>
                                <div className={top.imgContents}>
                                    <img
                                        className={top.img}
                                        src="/Blog post-bro.svg"
                                        alt="モチベーションを管理し物事の継続をサポート"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={top.contents}>
                            <div className={top.contentsWrp}>
                                <div className={top.imgContents}>
                                    <img
                                        className={top.img}
                                        src="/Analyze-amico.svg"
                                        alt="モチベーションを管理し物事の継続をサポート"
                                    />
                                </div>
                                <div className={top.textContents}>
                                    <h2 className={top.textContentsTitle}>
                                        日々の記録から
                                        <br />
                                        あなたのモチベーションを可視化
                                    </h2>
                                    <p className={top.textContentsDescription}>
                                        目標コミット到達度、一定期間の平均コミット数、前日とのコミット数の差
                                        <br />
                                        からあなたのモチベーションを可視化します。
                                        <br />
                                        モチベーションのムラをなくし、努力を継続しましょう。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className={top.footer}>
                        <div className={top.center}>
                            <h2 className={top.footerTitle}>今すぐ始める</h2>
                            <StyledFirebaseAuth
                                onClick={login}
                                uiConfig={uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
}

export default App;
