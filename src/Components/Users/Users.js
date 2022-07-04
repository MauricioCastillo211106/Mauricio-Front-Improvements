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


function Row(props) {

    const Add = () => {
        (async () => {
            Swal.fire({
                icon: 'info',
                title: 'Add',
                html: `
<input type="text" id="username" class="swal2-input" placeholder="username">
<input type="email" id="email" class="swal2-input" placeholder="email">
<input type="password" id="password" class="swal2-input" placeholder="password">
  <input type="number" id="phone_number" class="swal2-input" placeholder="phone_number">
              `,
                confirmButtonText: 'Sign in',
                focusConfirm: false,
                preConfirm: () => {
                    const username = Swal.getPopup().querySelector('#username').value
                    const email = Swal.getPopup().querySelector('#email').value
                    const password = Swal.getPopup().querySelector('#password').value
                    const phone_number = Swal.getPopup().querySelector('#phone_number').value

                    if ( !username || !email || !password || !password || !phone_number) {
                        Swal.showValidationMessage(`Please enter the correct dates`)
                    }

                    fetch('http://localhost:3001/models/user/register_user_orm?username='+username+'&email='+email+'&password='+password+'&phone_number='+phone_number,{method : 'POST'})
                        .then(() => console.log('Todo correcto'))
                        .catch((err) => {console.log(err);})

                    return {  Username: username, Email:email , Password:password, Phone_number:phone_number}
                }
            }).then((result) => {

                Swal.fire(`
    Username: ${result.value.Username}
    Email: ${result.value.Email}   
    Phone_number: ${result.value.Phone_number}
  `)

            })

        })()
    }

    const update = () => {
        (async () => {
            Swal.fire({
                icon: 'info',
                title: 'Add',
                html: `
<input type="text" id="id" class="swal2-input" placeholder="id">
<input type="text" id="username" class="swal2-input" placeholder="username">
<input type="email" id="email" class="swal2-input" placeholder="email">
<input type="password" id="password" class="swal2-input" placeholder="password">
  <input type="number" id="phone_number" class="swal2-input" placeholder="phone_number">
              `,
                confirmButtonText: 'Sign in',
                focusConfirm: false,
                preConfirm: () => {
                    const id = Swal.getPopup().querySelector('#id').value
                    const username = Swal.getPopup().querySelector('#username').value
                    const email = Swal.getPopup().querySelector('#email').value
                    const password = Swal.getPopup().querySelector('#password').value
                    const phone_number = Swal.getPopup().querySelector('#phone_number').value

                    if ( !id || !username || !email || !password || !password || !phone_number) {
                        Swal.showValidationMessage(`Please enter the correct dates`)
                    }

                    fetch('http://localhost:3001/models/user/update_user_orm?id='+id+'&username='+username+'&email='+email+'&password='+password+'&phone_number='+phone_number,{method : 'PUT'})
                        .then(() => console.log('Todo correcto'))
                        .catch((err) => {
                            console.log(err);})

                    return { ID:id, Username: username, Email:email , Password:password, Phone_number:phone_number}
                }
            }).then((result) => {

                Swal.fire(`
                ID: ${result.value.ID}
    Username: ${result.value.Username}
    Email: ${result.value.Email} 
    Phone_number: ${result.value.Phone_number}
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
                fetch('http://localhost:3001/models/user/delete_user_orm?id='+id, {method : 'DELETE'})
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
                <TableCell align="center">{props.email}</TableCell>
                <TableCell align="center">{props.password}</TableCell>
                <TableCell align="center">{props.phone_number}</TableCell>
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
                                        {props.fathers.map((historyRow) => (
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
        fetch("http://localhost:3001/models/user/all_users_orm", requestOptions)
            .then(response => response.json())
            .then(result => setList(result))
            .catch(error => console.log('error', error));
    }, [requestOptions])




    return (
        <div> <TableContainer sx={{ maxHeight: 250 }} component={Paper}>
            <Table class="table table-striped table-bordered table-hover table-dark" aria-label="collapsible table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell class="text-white"  align="center" />
                        <TableCell class="text-white"  align="center" >username</TableCell>
                        <TableCell class="text-white"  align="center">email</TableCell>
                        <TableCell class="text-white"  align="center">password</TableCell>
                        <TableCell class="text-white"  align="center">phone_number</TableCell>
                        <TableCell class="text-white"  align="center">ingreso</TableCell>
                        <TableCell class="text-white"  align="center">Agregar</TableCell>
                        <TableCell class="text-white"  align="center">Actualizar</TableCell>
                        <TableCell class="text-white"  align="center">Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row) => (

                        <Row key={row.id} id={row.id} username={row.username} email={row.email} password={row.password}  phone_number={row.phone_number} createdAt={row.createdAt} fathers={row.cat_fathers} />
                    ))}
                </TableBody>

            </Table>
        </TableContainer>

        </div>

    )
}
export default CollapsibleTable;