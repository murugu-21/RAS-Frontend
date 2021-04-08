import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableRow, TableHead, TableCell, TableBody, Table, Button} from '@material-ui/core';

export default function PurchaseList(){
    const [purchase_list, set_purhase_list] = useState([])

    useEffect(()=>{
        axios
        .get("http://localhost:8000/api/GetPurchaseList")
        .then((res) =>{
            set_purhase_list(res.data)
        })
    },[])

    const handleSubmit = () =>{
        axios
        .post("http://localhost:8000/api/GetPurchaseList")
        .then((res) =>{
            set_purhase_list(res.data)
        })
    }

    return(
        <div>
            <center><h1>PURCHASE LIST</h1></center>
            <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Ingredient name</TableCell>
                    <TableCell>Required amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{purchase_list[0]?( purchase_list.map((cell)=>(
                    <TableRow key={cell[0]}>
                        <TableCell>{cell[0] }</TableCell>
                        <TableCell>{cell[1] }</TableCell>
                        <TableCell>{cell[2] + " units"}</TableCell>
                    </TableRow>
                ))):
                <TableRow>
                    <TableCell colSpan={3}>No items to purchase</TableCell>
                </TableRow>}
                </TableBody>
            </Table>
            {purchase_list[0] && <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}>
                    Ordered
            </Button>}
        </div>
    )
}