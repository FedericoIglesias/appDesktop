import { ChangeEvent, useState } from "react";

export const ToDoList = () => {
  const [listTask, setListTask] = useState<string[] | []>([]);
  const [task, setTask] = useState<string>("");

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handlerClick = () => {
    if (task === "") {
      return;
    }
    setListTask([...listTask, task]);
    setTask("");
  };

  return (
    <>
      <p>I 'am a to do list</p>
      <div>
        <input type="text" onChange={(e) => handlerChange(e)} value={task} />
        <button onClick={handlerClick}>+</button>
      </div>
      {listTask.length == 0 ? (
        <p>No task in this moment</p>
      ) : (
        listTask.map((sentence: string, i: number) => {
          return <p key={i}>{sentence}</p>;
        })
      )}
    </>
  );
};
