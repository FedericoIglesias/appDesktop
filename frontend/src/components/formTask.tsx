import { ChangeEvent, KeyboardEvent } from "react";
import { main } from "../../wailsjs/go/models";
import { SaveTasks } from "../../wailsjs/go/main/App";

export const FormTask = ({
  task,
  setTask,
  listTask,
  list,
  setList,
}: {
  task: main.Task;
  setTask: any;
  list: main.Task[];
  setList: any;
  listTask: main.Task[];
}) => {
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

  const handlerKey = (e: KeyboardEvent<any>) => {
    if (e.key === "Enter") {
      handlerClick();
    }
  };

  return (
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
  );
};
