import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { TodoItem } from "../../app/models/todoItem";
import TodoList from "./TodoList";

export default function TaskBoard() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Todos.list()
            .then(todos => setTodos(todos))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [todos.length])

    if (loading) return <LoadingComponent message='Loading tasks...' />

    return (
        <>
            <TodoList todos={todos} />
        </>
    )
}