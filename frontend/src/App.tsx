import { ToDoList } from "./pages/toDoList";
import {
  createBrowserRouter,
  createRoutesFromElements,
  HashRouter,
  Route,
} from "react-router-dom";
import { RouterProvider, Routes } from "react-router";
import { MainPage } from "./pages/mainPage";

function App() {
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <>
  //       <Route path="/" element={<MainPage />} />
  //       <Route path="/tasks" element={<ToDoList />} />
  //     </>
  //   )
  // );

  return (
    <>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tasks" element={<ToDoList />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
