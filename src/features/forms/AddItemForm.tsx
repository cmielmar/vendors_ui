import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { nanoid } from 'nanoid'


interface Props {
  }

    export default function AddTask({
      }: Props) {
        const initialState = {
          id: nanoid(),
          name: "",
          content: "",
          priority: 3,
          status: "New",
        };

    const [todo, setTodo] = useState(initialState);
        const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });

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

    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Typography component="h1" variant="h5">
                New Task
            </Typography>
            <Box component="form" onSubmit={handleSubmit((data) =>  {
                console.log(JSON.stringify(data))
                    // axios.post<void>('/todos', data)
                    agent.Todos.create(data)
                        .then(() => {
                            toast.success('Adding new task successful');
                        })
                        .catch(error => handleApiErrors(error))
                        
                        .catch(error => console.log(JSON.stringify(error.data)))  }
                )}
                
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                 defaultValue={todo?.name} 

                    margin="normal"
                    fullWidth
                    label="Taskname"
                    autoFocus
                    {...register('name', { required: 'Taskname is required' })}
                    error={!!errors.name}
                    helperText={errors?.name?.message}
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
                    Add
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/todolist'>
                            {"Go Back to the task board"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
