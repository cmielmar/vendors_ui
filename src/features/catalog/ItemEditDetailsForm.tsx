import { LoadingButton } from "@mui/lab";
import { Box, Container, Divider, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Id, toast } from "react-toastify";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { TodoItem } from "../../app/models/todoItem";

interface IFormUnputs {
    name: string,
    content: string,
    priority: number
    status: string
}

export default function ItemEditDetailsForm() {
    const {id} = useParams<{id: string}>();
    const [todo, setTodo] = useState<TodoItem | null>(null);
    const [loading, setLoading] = useState(true);


    // const [todo, setTodo] = useState(initialState);
    const { control, register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm<IFormUnputs>({
    mode: 'all'
});

const submitHandler: SubmitHandler<IFormUnputs> =   (data: IFormUnputs) => {
    console.log('Data comming from the form' + data);
};

function handleApiErrors(errors: any) {
    if (errors) {
        errors.data.map((error: string) => {
            console.log(JSON.stringify(error) )
            var jsonErrStr = JSON.stringify(error);
            var jsonErr = JSON.parse(jsonErrStr);
            toast.error(jsonErr.errorMessage);
        });
    }
}

    useEffect(() => {
        if(id)
        agent.Todos.details(id)
            .then(data => setTodo(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id]);

    if (loading) return <LoadingComponent message='Loading ...' />

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Typography component="h1" variant="h5">
                Edit Current Task
            </Typography>
            <Box component="form" onSubmit={handleSubmit((data) =>  {
                const newData = {id, ...data}
                console.log(JSON.stringify(id))
                console.log(JSON.stringify(newData))
                    // axios.post<void>('/todos', data)
                    agent.Todos.update(newData)
                        .then(() => {
                            toast.success('Adding new task successful');
                            // history.push('/login');
                        })
                        .catch(error => handleApiErrors(error))
                        
                        .catch(error => console.log(JSON.stringify(error.data)))  }
                )}
                
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    value={todo?.name} 
                    margin="normal"
                    fullWidth
                    label="Task name"
                    
                    // {...register('name', { required: 'Taskname is required' })}
                    // error={!!errors.name}
                    // helperText={errors?.name?.message}
                />
                <TextField
                 defaultValue={todo?.content} 

                    margin="normal"
                    fullWidth
                    label="Content"
                    {...register('content', { 
                        required: 'Content is required',
                        pattern: {
                            value: /^.{3,250}$/,
                            message: 'Content too long or to short min. 3, max. 250'
                        } 
                    })}
                    error={!!errors.content}
                    helperText={errors?.content?.message}
                />
                 <TextField
                 defaultValue={todo?.priority} 
                    margin="normal"
                    fullWidth
                    label="Priority"
                    {...register('priority', { 
                        required: '',
                        pattern: {
                            value: /[1-5]/,
                            message: 'Priority 1 to 5'
                        } 
                    })}
                    error={!!errors.content}
                    helperText={errors?.content?.message}
                />
                 <TextField
                 defaultValue={todo?.status} 
                    margin="normal"
                    fullWidth
                    label="Status"
                    autoFocus
                    {...register('status', { 
                        required: '',
                        pattern: {
                            value: /^.{3,250}$/,
                            message: 'Priority 1 to 5'
                        } 
                    })}
                    error={!!errors.content}
                    helperText={errors?.content?.message}
                />
                <LoadingButton
                    disabled={!isValid}
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Edit
                </LoadingButton>
                <Grid container>
                    {/* <Grid item>
                        <Link to='/todolist'>
                            {"Go Back to the task board"}
                        </Link>
                    </Grid> */}
                </Grid>
            </Box>
        </Container>
    );
}
