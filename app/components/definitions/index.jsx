import React, { useState, useEffect } from "react";
import axios from "axios";

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
  };

  useEffect(() => {
    definitionPost(props.userId);
  }, [props.userId]);

  const list = definitions.map((data) => (
    <div style={{ display: "flex" }} key={data.id}>
      {data.definitions_name} {data.detail}{" "}
      <div style={{ width: 20, height: 20, backgroundColor: data.code }}></div>{" "}
      {data.colors_name}
    </div>
  ));

  return <div>{list}</div>;
}

export default DefinitionIndex;
