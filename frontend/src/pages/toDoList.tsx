import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { BringTasks, SaveTasks } from "../../wailsjs/go/main/App";
import styled from "styled-components";
import { main } from "../../wailsjs/go/models";
import { BackButton } from "../components/backButton";
import { ListTask } from "../components/listTask";
import { FormTask } from "../components/formTask";

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

export const ToDoList = () => {
  const [list, setList] = useState<main.Task[]>(listTask);
  const [task, setTask] = useState<main.Task>({
    Task: "",
    Id: new Date().getTime(),
    Priorly: 0,
  });

  useEffect(() => {
    listTask = list;
  }, [list]);

  return (
    <MainPage>
      <BackButton />
      <h1>Task to do</h1>
      <FormTask
        setTask={setTask}
        task={task}
        list={list}
        listTask={listTask}
        setList={setList}
      />
      <ListTask list={list} listTask={listTask} setList={setList} />
    </MainPage>
  );
};
