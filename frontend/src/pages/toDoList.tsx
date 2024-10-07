import { ChangeEvent, KeyboardEvent, useState } from "react";
import { WriteFile } from "../../wailsjs/go/main/App";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";

const DivTask = styled.section`
  div {
    background-color: #444;
    display: flex;
    border: 1px solid black;
    margin: 3px 0;
  }
`;

export const ToDoList = () => {
  const [listTask, setListTask] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ task: "", id: 0 });

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ task: e.target.value, id: new Date().getTime() });
  };

  const handlerClick = () => {
    if (task.task === "") {
      return;
    }
    setListTask([...listTask, task]);
    // WriteFile(task.task);
    setTask({ task: "", id: 0 });
  };

  const handlerKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handlerClick();
    }
  };

  const handlerDelete = (id: number) => {
    setListTask(listTask.filter((task: Task) => task.id !== id));
  };

  return (
    <>
      <p>I 'am a to do list</p>
      <div>
        <input
          type="text"
          onChange={(e) => handlerChange(e)}
          onKeyDown={(e) => handlerKey(e)}
          value={task.task}
        />
        <button onClick={handlerClick}>+</button>
      </div>
      <DivTask>
        {listTask.length == 0 ? (
          <div>
            <p>No task in this moment</p>
          </div>
        ) : (
          listTask.map((task: Task) => {
            return (
              <div key={task.id}>
                <p>{task.task}</p>
                <article onClick={() => handlerDelete(task.id)}>
                  <DeleteIcon />
                </article>
              </div>
            );
          })
        )}
      </DivTask>
    </>
  );
};
