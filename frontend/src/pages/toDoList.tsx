import { ChangeEvent, KeyboardEvent, useState } from "react";
import { WriteFile } from "../../wailsjs/go/main/App";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { main } from "../../wailsjs/go/models";

const DivTask = styled.section`
  div {
    background-color: #444;
    display: flex;
    border: 1px solid black;
    margin: 3px 0;
  }
`;

let listTask: main.Task[] = [];

export const ToDoList = () => {
  // const [listTask, setListTask] = useState<main.Task[]>([]);
  const [task, setTask] = useState<main.Task>({ Task: "", Id: 0 });

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ Task: e.target.value, Id: new Date().getTime() });
  };

  const handlerClick = () => {
    if (task.Task === "") {
      return;
    }
    listTask.push(task);
    WriteFile(listTask);
    setTask({ Task: "", Id: 0 });
  };

  const handlerKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handlerClick();
    }
  };

  const handlerDelete = (id: number) => {
    // setListTask(listTask.filter((Task: main.Task) => task.Id !== id));
  };

  return (
    <>
      <p>I 'am a to do list</p>
      <div>
        <input
          type="text"
          onChange={(e) => handlerChange(e)}
          onKeyDown={(e) => handlerKey(e)}
          value={task.Task}
        />
        <button onClick={handlerClick}>+</button>
      </div>
      <DivTask>
        {listTask.length == 0 ? (
          <div>
            <p>No task in this moment</p>
          </div>
        ) : (
          listTask.map((task: main.Task) => {
            return (
              <div key={task.Id}>
                <p>{task.Task}</p>
                <article onClick={() => handlerDelete(task.Id)}>
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
