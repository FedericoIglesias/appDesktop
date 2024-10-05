import { ChangeEvent, KeyboardEvent, useState } from "react";
import { WriteFile } from "../../wailsjs/go/main/App";

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
    WriteFile(task);
    setTask("");
  };

  const handlerKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handlerClick();
    }
  };

  return (
    <>
      <p>I 'am a to do list</p>
      <div>
        <input
          type="text"
          onChange={(e) => handlerChange(e)}
          onKeyDown={(e) => handlerKey(e)}
          value={task}
        />
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
