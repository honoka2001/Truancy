import React, {useState, useEffect} from "react";
import DefinitionIndex from "../components/definitions"
import firebase from "../components/firebase";
import { RepositoryFactory } from "../repositories/RepositoryFactory";

const userRepository = RepositoryFactory.get("users");
/*
firebase.auth().onAuthStateChanged((user) => {
        
        });
*/

export default function Home() {

  const [userData, setUserData] = useState([])
  
  async function userPost() {
    try {
        const res = await userRepository.post({
            user: {
              uid: userData.uid
            },
        });
        console.log(res.data.id);
    } catch (error) {
        console.log(err);
    }
  }
  // 更新もしくは表示された(マウント・アンマウント)直後にuserData中身をコンソールで呼び出す
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // user.uid => ⭐️ログイン中のユーザのuid
      // user.displayName => ログイン中のユーザーの名前
      setUserData(user)
    });
  }, [])

  return (
    <div>
      <DefinitionIndex userData={userData} />
    </div>
  )
}
