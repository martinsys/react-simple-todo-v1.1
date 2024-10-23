import { DragDropContext } from "@hello-pangea/dnd";

import Header from "./components/Header.jsx";
import TodoList from "./components/TodoList.jsx";
import TodoCreate from "./components/TodoCreate.jsx";
import TodoComputed from "./components/TodoComputed.jsx";
import TodoFilter from "./components/TodoFilter.jsx";
import {useEffect, useState} from "react";

const initialStateTodosTest = [
    {
        id: 1,
        title: "Complete online javascript bluuweb curse",
        completed: true
    },
    {
        id: 2,
        title: "Go to gym",
        completed: false
    },
    {
        id: 3,
        title: "10 minutes by meditation",
        completed: false
    }
]
const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || initialStateTodosTest;
const version = '1.1'
// se toma como default el thema del SO o de las preferencias
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const initialStateTheme = localStorage.getItem("theme") === null ? systemTheme : localStorage.getItem("theme");
const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const App = () => {

    const [todos, setTodos] = useState(initialStateTodos);
    const createTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title: title.trim(),
            completed: false
        };
        setTodos([...todos, newTodo])
    }
    const updateTodo = (id) => {
        setTodos(
            todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo)
        )
    }
    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }
    const computedItemsLeft = todos.filter((todo) => !todo.completed).length
    const clearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.completed));
    }

    const [filterTodo, setFilterTodo] = useState("all");
    const filteredTodos = () => {
        switch (filterTodo) {
            case "all":
                return todos;
            case "active":
                return todos.filter((todo) => !todo.completed);
            case "completed":
                return todos.filter((todo) => todo.completed);
            default:
                return todos
        }
    }
    const changeFilterTodo = (filterTodo) => setFilterTodo(filterTodo);

    const [theme, setTheme] = useState(initialStateTheme);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
        if (theme==='dark') {
            document.body.classList.add('body-light');
            document.body.classList.remove('body-dark');
        }else{
            document.body.classList.add('body-dark');
            document.body.classList.remove('body-light');
        }
    };

    // se almacena el them del usuario
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;

        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        )
            return;

        setTodos((prevTasks) =>
            reorder(prevTasks, source.index, destination.index)
        );
    };

    return (
        <div className={`transition-theme ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>

            <div className="custom-width-md container-md" >

                <Header toggleTheme={toggleTheme} theme={theme} version={version}/>
                <main className="todo-list mx-auto ">
                    <TodoCreate createTodo={createTodo} theme={theme}/>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <TodoList todos={filteredTodos()} removeTodo={removeTodo} updateTodo={updateTodo}
                                  theme={theme}/>
                    </DragDropContext>

                    <TodoComputed computedItemsLeft={computedItemsLeft} clearCompleted={clearCompleted}
                                  theme={theme}/>

                    <TodoFilter changeFilterTodo={changeFilterTodo} filterTodo={filterTodo} theme={theme}/>
                </main>

                <footer
                    className={`footer-controls mx-auto p-0 my-5 ${theme === "dark" ? "footer-dark" : "footer-light"}`}>
                    <p><span className="fw-bold text-decoration-underline">With</span> Drag and drop to reorder list</p>
                    <br/>
                    <p className="fs-footer">© 2024 Todo v{version} All rights reserved to Martin Alegría.
                        MIT License.</p>
                    <p className="fs-footer">Detail: &nbsp;
                        <span className="fw-bold text-decoration-underline">React</span> 18.3.1 (Build only with props),
                        &nbsp;<span className="fw-bold text-decoration-underline">Bootstrap</span> 5.3.0,
                        &nbsp;<span className="fw-bold text-decoration-underline">Localstorage</span> and
                        &nbsp;<span className="fw-bold text-decoration-underline">Hello-pangea/dnd 17.0.0</span>
                        &nbsp;<span className="fw-bold text-decoration-underline">Vite 5.4.8</span>.</p>

                    <p className="fs-footer">Code based on Bluuweb. <a
                        href="https://www.udemy.com/course/curso-react-js" className="links-custom">React
                        Course.</a></p>
                </footer>
            </div>
        </div>
    );
};

export default App;
