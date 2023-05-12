import { useState, useEffect } from "react";
import { Button } from '@mui/material';

const baseUrl = 'http://localhost:19681/api/consumo/Agregar'

function AddTarea () {
    // const [add, setAdd] = useState("");

    // useEffect(() => {
    //     fetch(baseUrl)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("data2 ", data.result.result)
    //       setAdd(data.result.result)
    //     })
    //     .catch(console.error);
    // }, []);

    return (
        <Button>
            Agregar
        </Button>
    );
    
}

export default AddTarea;