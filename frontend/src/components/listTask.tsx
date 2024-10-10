import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { main } from "../../wailsjs/go/models";
import { SaveTasks } from "../../wailsjs/go/main/App";

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

export const ListTask = ({
  list,
  setList,
  listTask,
}: {
  list: main.Task[];
  setList: any;
  listTask: main.Task[];
}) => {
  const handlerDelete = (id: number) => {
    listTask = list.filter((Task: main.Task) => Task.Id !== id);
    setList(listTask);
    SaveTasks(listTask);
  };

  return (
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
  );
};
