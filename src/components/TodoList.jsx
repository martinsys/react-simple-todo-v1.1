import TodoItem from "./TodoItem.jsx";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const TodoList = ({ todos, removeTodo, updateTodo, theme }) => {
    return (
        <Droppable droppableId="todos">
            {(droppableProvider) => (
                <ul
                    className="list-group mt-4"
                    ref={droppableProvider.innerRef}
                    {...droppableProvider.droppableProps}
                >
                    {todos.map((todo, index) => (
                        <Draggable key={todo.id} draggableId={`${todo.id}`} index={index}>
                            {(draggableProvider) => (
                                <li
                                    ref={draggableProvider.innerRef}
                                    {...draggableProvider.draggableProps}
                                    {...draggableProvider.dragHandleProps}
                                    className={`list-group-item d-flex align-items-center justify-content-between ${
                                        theme === "dark" ? "li-dark" : "li-light"
                                    }`}
                                >
                                    <TodoItem
                                        todo={todo}
                                        removeTodo={removeTodo}
                                        updateTodo={updateTodo}
                                        theme={theme}
                                    />
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {droppableProvider.placeholder}
                </ul>
            )}
        </Droppable>
    );
};
export default TodoList;
