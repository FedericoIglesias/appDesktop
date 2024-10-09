import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { BringTasks, SaveTasks } from "../../wailsjs/go/main/App";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { main } from "../../wailsjs/go/models";
import { BackButton } from "../components/backButton";

const DivTask = styled.div`
  background-color: #ddd;
  display: grid;
  padding: 3px 0 3px 10px;
  margin-bottom: 3px;
  grid-template-areas: "task date priorly delete";
  grid-template-columns: 50% 20% 20% 10%;
  p:nth-child(3),
  p:nth-child(2),
  p:nth-child(4) {
    text-align: center;
  }
`;

const MainPage = styled.main`
  h1 {
    color: white;
    text-align: center;
  }
  form {
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
    button {
      padding: 5px 10px;
      border: none;
    }
    button:hover {
      background-color: orange;
    }
    input {
      ::placeholder {
        color: #222;
      }
      padding: 2px 4px;
    }
    select {
      padding: 2px 4px;
    }
  }
  section {
    /* background-color: #aaa; */
    max-width: 90vw;
    margin: auto;
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
    <MainPage>
      <BackButton />
      <h1>Task to do</h1>
      <form>
        <input
          placeholder="Write your task"
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
        <button onClick={handlerClick}>Add task</button>
      </form>
      <section>
        {list.length == 0 ? (
          <DivTask>
            <p>No task in this moment</p>
          </DivTask>
        ) : (
          <>
            <DivTask>
              <p>Task</p>
              <p>Date</p>
              <p>Priorly</p>
              <p>Delete</p>
            </DivTask>
            {list.map((task: main.Task) => {
              return (
                <DivTask key={task.Id}>
                  <p>{task.Task}</p>
                  <p>{new Date(task.Id).toDateString()}</p>
                  <p>{checkPriorly(task.Priorly)}</p>
                  <p onClick={() => handlerDelete(task.Id)}>
                    <DeleteIcon />
                  </p>
                </DivTask>
              );
            })}
          </>
        )}
      </section>
    </MainPage>
  );
};
