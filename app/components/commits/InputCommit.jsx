import React, { useState } from "react";
import { RepositoryFactory } from "../../repositories/RepositoryFactory";

const commitRepository = RepositoryFactory.get("commits");

export default function InputCommit(props) {
  const [definitionId, setDefinitionId] = useState(1);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [count, setCount] = useState(1);

  const handleDefinitionChange = (e) => {
    setDefinitionId(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleCountChaneg = (e) => {
    setCount(e.target.value);
  };

  // userIdを親コンポーネントからもらう必要がある
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await commitRepository.post({
        commit: {
          user_id: props.userId,
          definition_id: definitionId,
          message: message,
          date: date,
          count: count,
        },
      });
      console.log(res);
      setDefinitionId('');
      setMessage('');
      setDate('');
      setCount('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" onChange={handleMessageChange} />
        <input type="date" name="date" onChange={handleDateChange} />
        <input type="number" name="count" onChange={handleCountChaneg} />
        <input type="submit" value="登録" />
      </form>
    </div>
  );
}
