import { useUpdateTodoMutation, useDeleteTodoMutation } from "../api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ todo }) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <article key={todo.id}>
      <div className="todo">
        <input
          type="checkbox"
          id={todo.id}
          checked={todo.completed}
          onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
        />
        <label htmlFor={todo.id}>{todo.title}</label>
        <button onClick={() => deleteTodo({ id: todo.id })}>
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </button>
      </div>
    </article>
  );
};

export default TodoItem;
