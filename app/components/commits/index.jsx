import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";

const commitRepository = RepositoryFactory.get("commits");

export default function CommitIndex(props) {
  const [commits, setCommits] = useState([]);

  const commitPost = async (uid) => {
    try {
      const res = await commitRepository.post({
        user: {
          uid: uid,
        },
      });
      console.log(res);
      setCommits(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(props.userData.uid);
    commitPost(props.userData.uid);
  });

  return <div></div>;
}
