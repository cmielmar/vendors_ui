import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Status } from "../../app/models/status";
import { Vendor } from "../../app/models/vendor";

interface IFormUnputs {
    firstName: string,
    lastName: string,
    hourlyRate: number,
    status: string
}

export default function VendorEditDetailsForm() {
    const {id} = useParams<{id: string}>();
    const [vendor, setVendor] = useState<Vendor | null>(null);
    const [loading, setLoading] = useState(true);


    // const [todo, setTodo] = useState(initialState);
    const { control, register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm<IFormUnputs>({
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
        if(id){
        agent.Vendors.details(id)
            .then(data => setVendor(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))}
    }, [id]);

    if (loading) return <LoadingComponent message='Loading ...' />
    return (
        <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Typography component="h1" variant="h5">
                Edit Current Vendor
            </Typography>
            <Box component="form" onSubmit={handleSubmit((data) =>  {
                const newData = {id, ...data}
                console.log(JSON.stringify(id))
                console.log(JSON.stringify(newData))
                    // axios.post<void>('/todos', data)
                    agent.Vendors.update(newData)
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
                    value={vendor?.firstName} 
                    margin="normal"
                    fullWidth
                    label="First name"
                    
                    {...register('firstName', { required: 'Taskname is required' })}
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                />
                 <TextField
                    value={vendor?.lastName} 
                    margin="normal"
                    fullWidth
                    label="Last name"
                    
                    {...register('lastName', { required: 'Taskname is required' })}
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                />
                <TextField
                 defaultValue={vendor?.hourlyRate} 
                    margin="normal"
                    fullWidth
                    label="Hourly rate"
                    {...register('hourlyRate', { required: 'Hourly rate is required' })}
                    error={!!errors.hourlyRate}
                    helperText={errors?.hourlyRate?.message}
                />
              
                 <TextField
                 defaultValue={vendor?.status} 
                    margin="normal"
                    fullWidth
                    label="Status"
                    {...register('status', { required: ''})}
                    error={!!errors.status}
                    helperText={errors?.status?.message}
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
