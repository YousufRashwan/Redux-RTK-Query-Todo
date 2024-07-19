import Layout from "./components/Layout";
import TodoList from "./features/todos/TodoList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TodoList />} />
      </Route>
    </Routes>
  );
}

export default App;
