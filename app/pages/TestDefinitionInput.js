import React, {useState, useEffect} from "react";
import DefinitionIndex from "../components/definitions"
import DefinitionInput from "../components/definitions/Input";
import firebase from "../components/firebase";
import { RepositoryFactory } from "../repositories/RepositoryFactory";

const userRepository = RepositoryFactory.get("users");
/*
firebase.auth().onAuthStateChanged((user) => {
        
        });
*/

export default function Home() {

  const [userData, setUserData] = useState([])
  const [userId, setUserId] = useState('');
  
  async function userPost(uid) {
    try {
        const res = await userRepository.post({
            user: {
              uid: uid
            },
        });
        console.log(res);
        setUserId(res.data.id);
    } catch (err) {
        console.log(err);
    }
  }
  // 更新もしくは表示された(マウント・アンマウント)直後にuserData中身をコンソールで呼び出す
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // user.uid => ⭐️ログイン中のユーザのuid
      // user.displayName => ログイン中のユーザーの名前
      userPost(user.uid);
    });
  }, [])

  return (
    <div>
      <DefinitionIndex userId={userId} />
      <DefinitionInput userId={userId} />
    </div>
  )
}
