import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Vendor } from "../../app/models/vendor";
import VendorCard from "./VendorCard";

export default function VendorList() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Vendors.list()
            .then(vendors => setVendors(vendors))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [vendors.length])
    console.log(vendors)

    return (
        <Grid container spacing={4}>
            {vendors && vendors.map(v => (
                <Grid item xs={3} key={v.id}>
                    <VendorCard vendor={v} />
                </Grid>
            ))}
        </Grid>
    )
}