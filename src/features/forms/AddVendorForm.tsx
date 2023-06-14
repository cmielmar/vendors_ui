import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper, } from '@mui/material';
import { Link,  } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { nanoid } from 'nanoid'

interface Props {
  }

    export default function AddVendor({
      }: Props) {
        const initialState = {
          id: nanoid(),
          firstName: "",
          lastName: "",
          hourlyRate: 100,
          status: "Applicant",
        };

    const [vendor, setVendor] = useState(initialState);
        const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
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
                New Vendor
            </Typography>
            <Box component="form" onSubmit={handleSubmit((data) =>  {
                console.log(JSON.stringify(data))
                     // axios.post<void>('/vendors', data)
                    agent.Vendors.create(data)
                        .then(() => {
                            toast.success('Adding new vendor successful');
                        })
                        .catch(error => handleApiErrors(error))
                        
                        .catch(error => console.log(JSON.stringify(error.data)))  }
                )}
                
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                 defaultValue={vendor?.firstName} 

                    margin="normal"
                    fullWidth
                    label="First name"
                    autoFocus
                    {...register('firstName', { required: 'First name is required' })}
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                />
                 <TextField
                 defaultValue={vendor?.lastName} 

                    margin="normal"
                    fullWidth
                    label="Last name"
                    autoFocus
                    {...register('lastName', { required: 'First name is required' })}
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
                    Add Vendor
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/vendorlist'>
                            {"Go Back to Vendors"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
