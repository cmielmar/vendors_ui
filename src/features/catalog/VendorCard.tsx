import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Status } from "../../app/models/status";
import { Vendor } from "../../app/models/vendor";

interface Props {
    vendor: Vendor
}

export default function VendorCard({ vendor }: Props) {

    const handleItemDelete = () => {
        console.log(vendor.id.toString())
        agent.Vendors.delete(vendor.id)
        .then(data =>console.log(data + ' was deleted.'))
        .catch(error => console.log(error))
        window.location.reload()
    }

    return (
        <Card>
             <CardMedia>
            <Typography variant="body2" color="text.secondary" paddingLeft={"14px"} paddingRight={"12px"}>
            <TextField
                 value={vendor?.firstName} 
                    margin="normal"
                    fullWidth
                    label="First Name"
                    autoFocus
                />
                </Typography>
            </CardMedia>
            <CardMedia>
            <Typography variant="body2" color="text.secondary" paddingLeft={"14px"} paddingRight={"12px"}>
            <TextField
                 value={vendor?.lastName} 
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    autoFocus
                />
                </Typography>
            </CardMedia>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                <TextField
                 defaultValue={vendor?.hourlyRate} 
                    margin="normal"
                    fullWidth
                    label="Hourly rate"
                />
                <TextField
                 value={vendor?.status} 
                    margin="normal"
                    fullWidth
                    label="Status"
                    autoFocus
                    sx={{width: 120, height: 10}}
                />
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/vendorlist/${vendor.id}`} sx={{pt: 4}} size="small">Edit</Button>
                <Button component={Link} to={'/addvendor'} sx={{pt: 4}} size="small">Create</Button>
                {   vendor.status == "Deleted" &&
                <Button onClick={handleItemDelete}  sx={{pt: 4}} size="small">Delete</Button>
            }
            </CardActions>
        </Card>
    )
}