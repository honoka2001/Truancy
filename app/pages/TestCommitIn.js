import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CommitModal(props) {
  const [definition, setDefinition] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleDefinitionChange = (e) => {
    setDefinition(e.target.value);
  };

  const handleSubmit = () => {
    axios.post("http://localhost:3000/commits/1", {
        definition: definition,
        message: message,
        date: date
    })
    .then(function (response) {
        console.log(response.data)
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <input type="date" name="date" />
        <input type="submit" value="登録" />
      </form>
    </div>
  );
}
