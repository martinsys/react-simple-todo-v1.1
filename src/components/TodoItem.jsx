import crossIcon from "../assets/images/icon-cross.svg";

const TodoItem = ({ todo, removeTodo, updateTodo, theme }) => {
    return (
        <>
            <div>
                <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    checked={todo.completed}
                    onChange={() => updateTodo(todo.id)}
                />
                <span
                    className={`${
                        todo.completed
                            ? theme === "dark"
                                ? "text-decoration-line-through completed-dark"
                                : "text-decoration-line-through text-black-50 opacity-50"
                            : ""
                    }`}
                >
          {todo.title}
        </span>
            </div>
            <button onClick={() => removeTodo(todo.id)} className="btn btn-link">
                <img src={crossIcon} alt="delete" className="icon-cross" />
            </button>
        </>
    );
};

export default TodoItem;