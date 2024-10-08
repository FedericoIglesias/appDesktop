import {
  ChangeEvent,
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { BringTasks, SaveTasks } from "../../wailsjs/go/main/App";
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

BringTasks().then((t: string) => {
  const listBring = t.split("\n");
  listBring.map((str: string) => {
    const arr = str.split(";");
    if (arr[0] !== "") {
      listTask.push({ Task: arr[1], Id: Number(arr[0]), Priorly: 0 });
    }
  });
});

const checkPriorly = (value: number) => {
  switch (value) {
    case 0:
      return "Low";
    case 1:
      return "Normal";
    case 2:
      return "High";
  }
};

export const ToDoList = () => {
  const [list, setList] = useState<main.Task[]>(listTask);
  const [task, setTask] = useState<main.Task>({
    Task: "",
    Id: new Date().getTime(),
    Priorly: 0,
  });

  const handlerChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, Task: e.target.value });
  };

  const handlerChangePriorly = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget);
    setTask({ ...task, Priorly: Number(e.target.value) });
  };

  const handlerClick = () => {
    if (task.Task === "") {
      return;
    }
    listTask.push(task);
    setList(listTask);
    SaveTasks(listTask);
    setTask({ Task: "", Id: new Date().getTime(), Priorly: 0 });
  };

  const handlerKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handlerClick();
    }
  };

  const handlerDelete = (id: number) => {
    listTask = list.filter((Task: main.Task) => Task.Id !== id);
    setList(listTask);
    SaveTasks(listTask);
  };

  useEffect(() => {
    setList(listTask);
  }, []);

  return (
    <>
      <p>I 'am a to do list</p>
      <div>
        <input
          type="text"
          onChange={(e) => handlerChangeTask(e)}
          onKeyDown={(e) => handlerKey(e)}
          value={task.Task}
        />
        <select
          name=""
          id=""
          onChange={(e) => handlerChangePriorly(e)}
          onKeyDown={(e) => handlerKey(e)}
          value={task.Priorly}
        >
          <option value={0}>Low</option>
          <option value={1}>Normal</option>
          <option value={2}>High</option>
        </select>
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
                <p>{checkPriorly(task.Priorly)}</p>
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
