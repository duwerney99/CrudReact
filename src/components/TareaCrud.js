import { useEffect, useState } from 'react';
// import { TableContainer, TextField } from '@mui/material';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField,  Modal} from '@mui/material';

function TareaCrud () {

    const baseUrl = "http://localhost:19681/api/consumo";
    // const [id, setId] = useState("");
    const [descripcion, setDescripcion] = useState("");
    // const [fecha, setFecha] = useState("");
    const [tareas, setTareas] = useState([]);
    const [open, setOpen] = useState(false);

    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    //Metodo obtener datos
    const mostrarTareas = async () => {
        const response = await fetch(baseUrl);

        if (response.ok) {
            const data = await response.json();
            console.log(data.result)
            setTareas(data.result);
        } else {
            console.log("status code: " + response.status);
        }
    }


    useEffect(() => {
        mostrarTareas();
    }, []);

    const guardarTarea = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:19681/api/consumo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({descripcion : descripcion})
        })

        if (response.ok) {
            setDescripcion("");
            await mostrarTareas();
        }
    }
    


  return (
    <>
    
    <div className="mui-container-fluid">
        <h1>Tarea Details</h1>
        <div>
        <div>
            {/* <label>Descripcion</label> */}
            <Modal open={open} onClose={handleClose}>
                <div style={{margin: '200px auto auto', marginTop: 200, backgroundColor: '#fff', padding: '76px', width: '457px' }}>
                    <h2>Agregar Tareas</h2>
                    <TextField
                        style={{width: "200px", margin: "5px"}}
                        type='text'
                        label="Descripcion"
                        variant='outlined'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        />
                    <Button
                    className='btn btn-success'
                    color='success'
                    style={{position: 'relative', fontSize: '1.1rem', marginLeft: '15%'}}
                    variant='contained'
                    onClick={(e) => guardarTarea(e)}
                    >
                        Guardar
                    </Button>
                </div>
            </Modal>
        
        </div>
        </div>
        <div>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>IdTarea</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>FechaRegistro</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tareas.map(
                        (tarea) => (
                        <TableRow key={tarea.idTarea}>
                            <TableCell>{tarea.idTarea}</TableCell>
                            <TableCell>{tarea.descripcion}</TableCell>
                            <TableCell>{tarea.fechaRegistro}</TableCell>
                            <TableCell>
                                <Button className='btn btn-success'
                                    variant='outlined'
                                >Editar</Button>
                                <Button className='btn btn-danger'
                                    variant='contained'
                                    color='error'
                                    style={{margin: "7px"}}
                                >Eliminar</Button>
                                <Button
                                    className='btn btn-success'
                                    color='success'
                                    variant='contained'
                                    onClick={handleOpen}
                                >Agregar</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    </div>
    </>
  );
}

export default TareaCrud;