import { Grid } from "@mui/material";
import { TodoItem } from "../../app/models/todoItem";
import TodoCard from "./TodoCard";

interface Props {
    todos: TodoItem[];
}

export default function TodoList({ todos }: Props) {

console.log(todos)

    return (
        <Grid container spacing={4}>
            {todos && todos.map(todo => (
                <Grid item xs={3} key={todo.id}>
                    <TodoCard todo={todo} />
                </Grid>
            ))}
        </Grid>
    )
}