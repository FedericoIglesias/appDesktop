import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <main>
      <p>Finance</p>
      <Link to="/tasks">
        <p>Task</p>
      </Link>
    </main>
  );
};
