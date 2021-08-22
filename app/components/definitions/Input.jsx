import axios from "axios";
import React, { useEffect, useState } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";

const definitionRepository = RepositoryFactory.get("definitions");

export default function DefinitionInput(props) {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [colorId, setColorId] = useState("");
  const [colors, setColors] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };
  const handleColorChange = (e) => {
    setColorId(e.target.value);
  };

  const getColors = async () => {
    try {
      axios.get("http://localhost:3000/colors").then(function (res) {
        setColors(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await definitionRepository.post({
        definition: {
          user_id: props.userId,
          name: name,
          detail: detail,
          color_id: colorId,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getColors();
  }, [props.userId]);

  const option = colors.map((data, index) => (
    <option value={data.id} key={index} style={{backgroundColor: data.code}}>
      {data.name}
    </option>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>定義名</label>
        <input type="text" name="name" onChange={handleNameChange} />
        <label>詳細</label>
        <input type="text" name="detail" onChange={handleDetailChange} />
        <select onChange={handleColorChange}>
          <option> -- </option>
          {option}
        </select>
        <input type="submit" />
      </form>
    </div>
  );
}
