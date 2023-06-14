import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { TodoItem } from "../../app/models/todoItem";

interface Props {
    todo: TodoItem
}

export default function TodoCard({ todo }: Props) {

    const handleItemDelete = () => {
        console.log(todo.id.toString())
        agent.Todos.delete(todo.id)
        .then(data =>console.log(data + ' was deleted.'))
        .catch(error => console.log(error))
        window.location.reload()
    }

    return (
        <Card>
            <CardHeader 
                title={todo.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main'}
                }}
            />
            <CardMedia>
            <Typography variant="body2" color="text.secondary" paddingLeft={"14px"} paddingRight={"12px"}>
            <TextField
                 value={todo?.content} 
                    margin="normal"
                    fullWidth
                    label="Content"
                    autoFocus
                />
                </Typography>
            </CardMedia>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                <TextField
                 value={todo?.priority} 
                    margin="normal"
                    fullWidth
                    label="Priority"
                    autoFocus
                    sx={{width: 90}}
                />
                <TextField
                 value={todo?.status} 
                    margin="normal"
                    fullWidth
                    label="Status"
                    autoFocus
                    sx={{width: 120, height: 10}}
                />
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/todolist/${todo.id}`} size="small">Edit</Button>
                <Button component={Link} to={'/addtask'} size="small">Create</Button>
                {   todo.status == "Done" &&
                <Button onClick={handleItemDelete}  size="small">Delete</Button>
            }
            </CardActions>
        </Card>
    )
}