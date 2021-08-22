import React, { useState, useEffect } from "react";
import axios from 'axios';

function DefinitionIndex(props) {
  const [definitions, setDefinitions] = useState([]);

  const definitionPost = (userId) => {
    try {
      axios
        .get("http://localhost:3000/definitions", {
          params: {
            id: userId,
          },
        })
        .then(function (res) {
          console.log(res.data);
          setDefinitions(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    definitionPost(props.userId);
  }, [props.userId])

  const list = definitions.map((data) => (
    <li key={data.id}>{data.definitions_name} {data.detail} {data.colors_name}</li>
  ));

  return (
    <div>
      {list}
    </div>
  )
}

export default DefinitionIndex;