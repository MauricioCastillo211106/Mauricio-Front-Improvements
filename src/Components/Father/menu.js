import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useState, useEffect} from "react";
import Swal from "sweetalert2";
import Nav_Bar from "./Nav_Bar";


function Row(props) {

    const Add = () => {
        (async () => {
            Swal.fire({
                icon: 'info',
                title: 'Add',
                html: `
<input type="text" id="name" class="swal2-input" placeholder="Mauricio david">
<input type="text" id="lastNameF" class="swal2-input" placeholder="lastNameF">
<input type="text" id="lastNameM" class="swal2-input" placeholder="lastNameM">
  <input type="text" id="age" class="swal2-input" placeholder="age">
            <input type="text" id="catUserId" class="swal2-input" placeholder="catUserId">   `,
                confirmButtonText: 'Sign in',
                focusConfirm: false,
                preConfirm: () => {
                    const name = Swal.getPopup().querySelector('#name').value
                    const lastNamef = Swal.getPopup().querySelector('#lastNameF').value
                    const lastNamem = Swal.getPopup().querySelector('#lastNameM').value
                    const age = Swal.getPopup().querySelector('#age').value
                    const catUserId = Swal.getPopup().querySelector('#catUserId').value
                    if ( !name || !lastNamef || !lastNamem || !age || !catUserId) {
                        Swal.showValidationMessage(`Please enter the correct dates`)
                    }

                    fetch('http://localhost:3001/models/father/create_father_orm?name='+name+'&lastNamef='+lastNamef+'&lastNamem='+lastNamem+'&age='+age+'&catUserId='+catUserId,{method : 'POST'})
                        .then(() => console.log('Todo correcto'))
                        .catch((err) => {console.log(err);})

                    return {  Name: name, LastNameF:lastNamef , LastNameM:lastNamem, Age:age,catUserId:catUserId}
                }
            }).then((result) => {

                Swal.fire(`
    Name: ${result.value.Name}
    LastNameF: ${result.value.LastNameF}
    LastNameM: ${result.value.LastNameM}    
    Age: ${result.value.Age}
  `)

            })

        })()
    }

    const update = () => {
        (async () => {
             Swal.fire({
                 icon: 'info',
                title: 'update Form',
                html: `<input type="text" id="ID" class="swal2-input" placeholder="ID">
<input type="text" id="name" class="swal2-input" placeholder="Mauricio david">
<input type="text" id="lastNameF" class="swal2-input" placeholder="lastNameF">
<input type="text" id="lastNameM" class="swal2-input" placeholder="lastNameM">
  <input type="text" id="age" class="swal2-input" placeholder="age">
            <input type="text" id="catUserId" class="swal2-input" placeholder="catUserId">   `,
                confirmButtonText: 'Sign in',
                focusConfirm: false,
                preConfirm: () => {
                    const id = Swal.getPopup().querySelector('#ID').value
                    const name = Swal.getPopup().querySelector('#name').value
                    const lastNamef = Swal.getPopup().querySelector('#lastNameF').value
                    const lastNamem = Swal.getPopup().querySelector('#lastNameM').value
                    const age = Swal.getPopup().querySelector('#age').value
                    const catUserId = Swal.getPopup().querySelector('#catUserId').value
                    if (!id || !name || !lastNamef || !lastNamem || !age || !catUserId) {
                        Swal.showValidationMessage(`Please enter the correct dates`)
                    }

                        fetch('http://localhost:3001/models/father/update_father_orm?id='+id+'&name='+name+'&lastNamef='+lastNamef+'&lastNamem='+lastNamem+'&age='+age+'&catUserId='+catUserId,{method : 'PUT'})
                            .then(() => console.log('Todo correcto'))
                            .catch((err) => {
                                console.log(err);})

                    return { ID: id, Name: name, LastNameF:lastNamef , LastNameM:lastNamem, Age:age,catUserId:catUserId}
                }
            }).then((result) => {

                Swal.fire(`
    ID: ${result.value.ID}
    Name: ${result.value.Name}
    LastNameF: ${result.value.LastNameF}
    LastNameM: ${result.value.LastNameM}    
    Age: ${result.value.Age}
  `)

            })

        })()
    }

    const eliminar = () => {
        (async () => {
            const {value : id } = await Swal.fire({
                icon: 'warning',
                title: 'Esta apunto de Eliminar un dato',
                text: 'Ingrese un ID',
                input: 'text',
                inputPlaceholder: 'ID',
                inputValue: 'cf62ef2a-0a17-4287-968f-9c9104cb50fb'
            });
            if(id){
                fetch('http://localhost:3001/models/father/destroy_father_orm?id='+id, {method : 'DELETE'})
                    .then(res => console.log(res))
                    .catch((err) => console.error(err))
            }
        })()
    }


    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell  component="th" scope="row"  align="center">{props.username}</TableCell>
                <TableCell align="center">{props.LastNameF}</TableCell>
                <TableCell align="center">{props.lastNameM}</TableCell>
                <TableCell align="center">{props.age}</TableCell>
                <TableCell align="center">{props.createdAt}</TableCell>
                <TableCell  align="center"><button  onClick={Add}  className='btn btn-primary'><i className="fa-solid fa-circle-plus"/></button></TableCell>
                <TableCell  align="center"><button onClick={update}  className='btn btn-warning'><i className="fa-solid fa-file-pen"/></button></TableCell>
                <TableCell  align="center"><button onClick={eliminar} className='btn btn-danger'><i className="fas fa-trash-alt"/></button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography class="text-white" variant="h6" gutterBottom component="div">
                                Hijos
                            </Typography>
                            <div> <TableContainer sx={{ maxHeight: 250 }} >
                            <Table size="small"  aria-label="purchases" class="table table-striped table-bordered table-hover table-dark">
                                <TableHead>
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell class="text-white"  align="center">nombre</TableCell>
                                        <TableCell class="text-white"  align="center">apellido paterno</TableCell>
                                        <TableCell class="text-white"  align="center">apellido materno</TableCell>
                                        <TableCell class="text-white"  align="center">edad</TableCell>
                                        <TableCell class="text-white"  align="center">ingreso</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.father.map((historyRow) => (
                                        <TableRow key={historyRow.id}>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => setOpen2(!open2)}
                                                >
                                                    {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell class="text-white"  component="th" scope="row" align="center"> {historyRow.name} </TableCell>
                                            <TableCell class="text-white"  align="center">{historyRow.lastNamef}</TableCell>
                                            <TableCell class="text-white"  align="center">{historyRow.lastNamem}</TableCell>
                                            <TableCell class="text-white"  align="center">{historyRow.age}</TableCell>
                                            <TableCell class="text-white"  align="center">{historyRow.createdAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                                </TableContainer>
                                </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}




 function CollapsibleTable() {

     const [list, setList] = useState([]);

     // eslint-disable-next-line react-hooks/exhaustive-deps
     var requestOptions = {
         method: 'GET',
         redirect: 'follow'
     };
     useEffect(() => {
         fetch("http://localhost:3001/models/father/all_father_orm", requestOptions)
             .then(response => response.json())
             .then(result => setList(result))
             .catch(error => console.log('error', error));
     }, [requestOptions])




     return (
         <div><Nav_Bar/>
         <div> <TableContainer sx={{ maxHeight: 250 }} component={Paper}>
             <Table class="table table-striped table-bordered table-hover table-dark" aria-label="collapsible table" stickyHeader>
                 <TableHead>
                     <TableRow>
                         <TableCell class="text-white"  align="center" />
                         <TableCell class="text-white"  align="center" >name</TableCell>
                         <TableCell class="text-white"  align="center">LastNameF</TableCell>
                         <TableCell class="text-white"  align="center">LastnameM</TableCell>
                         <TableCell class="text-white"  align="center">Edad</TableCell>
                         <TableCell class="text-white"  align="center">ingreso</TableCell>
                         <TableCell class="text-white"  align="center">Agregar</TableCell>
                         <TableCell class="text-white"  align="center">Actualizar</TableCell>
                         <TableCell class="text-white"  align="center">Eliminar</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {list.map((row) => (

                         <Row key={row.id} id={row.id} username={row.name} LastNameF={row.lastNamef} lastNameM={row.lastNamem} age={row.age} createdAt={row.createdAt} father={row.cat_sons} />
                     ))}
                 </TableBody>

             </Table>
         </TableContainer>

         </div></div>


    )
}
export default CollapsibleTable;