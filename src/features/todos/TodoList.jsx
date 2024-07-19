import { useState } from "react";

import { useGetTodosQuery, useAddTodoMutation } from "../api/apiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import TodoItem from "./TodoItem";

const TodoList = () => {
  const [title, setTitle] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();

  function handleSubmit(e) {
    e.preventDefault();
    addTodo({
      userId: 1,
      title: title,
      completed: false,
      id: `${Number(todos[0].id) + 1}`,
    });
    setTitle("");
  }

  const AddTodoForm = (
    <form>
      <label htmlFor="title">Add New Todo</label>
      <input
        id="title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSubmit}>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let TodoElements;
  if (isLoading) {
    TodoElements = <p>Loading...</p>;
  } else if (isSuccess) {
    TodoElements = todos.map((todo) => {
      return <TodoItem key={todo.id} todo={todo} />;
    });
  } else if (isError) {
    TodoElements = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Todo</h1>
      <div>{AddTodoForm}</div>
      <div>{TodoElements}</div>
    </div>
  );
};

export default TodoList;
