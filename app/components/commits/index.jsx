import axios from "axios";
import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";

const commitRepository = RepositoryFactory.get("commits");

export default function CommitIndex(props) {
  const [commits, setCommits] = useState([]);
  const [commitsGet, setCommitsGet] = useState(true);

  const commitPost = async (userId) => {
    if (userId != '' && commitsGet){
      try {
        axios
          .get("http://localhost:3000/commits", {
            params: {
              id: userId,
            },
          })
          .then(function (res) {
            console.log(res.data);
            setCommits(res.data);
            setCommitsGet(false);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    console.log(props.userId);
    commitPost(props.userId);
  });

  return (
    <div>
      {commits.map((data) => 
        <li key={data.id}>{data.name} {data.message} カウント:{data.count}</li>
      )}
    </div>
  );
}
