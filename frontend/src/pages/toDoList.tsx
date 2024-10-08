import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
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
  const [list, setList] = useState<main.Task[]>(listTask);
  const [task, setTask] = useState<main.Task>({ Task: "", Id: 0 });

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ Task: e.target.value, Id: new Date().getTime() });
  };

  const handlerClick = () => {
    if (task.Task === "") {
      return;
    }
    listTask.push(task);
    setList(listTask);
    WriteFile(listTask);
    setTask({ Task: "", Id: 0 });
  };

  const handlerKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handlerClick();
    }
  };

  const handlerDelete = (id: number) => {
    // setList(list.filter((Task: main.Task) => Task.Id !== id));
    listTask = list.filter((Task: main.Task) => Task.Id !== id);
    setList(listTask);
    WriteFile(listTask);
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
        {list.length == 0 ? (
          <div>
            <p>No task in this moment</p>
          </div>
        ) : (
          list.map((task: main.Task) => {
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
