import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
            <input type="text" id="catFatherId" class="swal2-input" placeholder="catFatherId">   `,
                confirmButtonText: 'Sign in',
                focusConfirm: false,
                preConfirm: () => {
                    const name = Swal.getPopup().querySelector('#name').value
                    const lastNamef = Swal.getPopup().querySelector('#lastNameF').value
                    const lastNamem = Swal.getPopup().querySelector('#lastNameM').value
                    const age = Swal.getPopup().querySelector('#age').value
                    const catFatherId = Swal.getPopup().querySelector('#catFatherId').value
                    if ( !name || !lastNamef || !lastNamem || !age || !catFatherId) {
                        Swal.showValidationMessage(`Please enter the correct dates`)
                    }

                    fetch('http://localhost:3001/models/son/create_son_orm?name='+name+'&lastNamef='+lastNamef+'&lastNamem='+lastNamem+'&age='+age+'&catUserId='+catFatherId,{method : 'POST'})
                        .then(() => console.log('Todo correcto'))
                        .catch((err) => {console.log(err);})

                    return {  Name: name, LastNameF:lastNamef , LastNameM:lastNamem, Age:age,catFatherId:catFatherId}
                }
            }).then((result) => {

                Swal.fire(`
    Name: ${result.value.Name}
    LastNameF: ${result.value.LastNameF}
    LastNameM: ${result.value.LastNameM}    
    Age: ${result.value.Age}
    catFatherId: ${result.value.catFatherId}
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
<input type="text" id="id" class="swal2-input" placeholder="ID">
<input type="text" id="name" class="swal2-input" placeholder="Mauricio david">
<input type="text" id="lastNameF" class="swal2-input" placeholder="lastNameF">
<input type="text" id="lastNameM" class="swal2-input" placeholder="lastNameM">
  <input type="text" id="age" class="swal2-input" placeholder="age">
            <input type="text" id="catFatherId" class="swal2-input" placeholder="catFatherId">   `,
                    confirmButtonText: 'Sign in',
                    focusConfirm: false,
                    preConfirm: () => {
                        const id = Swal.getPopup().querySelector('#id').value
                        const name = Swal.getPopup().querySelector('#name').value
                        const lastNamef = Swal.getPopup().querySelector('#lastNameF').value
                        const lastNamem = Swal.getPopup().querySelector('#lastNameM').value
                        const age = Swal.getPopup().querySelector('#age').value
                        const catFatherId = Swal.getPopup().querySelector('#catFatherId').value
                        if (!id || !name || !lastNamef || !lastNamem || !age || !catFatherId) {
                            Swal.showValidationMessage(`Please enter the correct dates`)
                        }

                        fetch('http://localhost:3001/models/son/update_son_orm?id='+id+'&name='+name+'&lastNamef='+lastNamef+'&lastNamem='+lastNamem+'&age='+age+'&catFatherId='+catFatherId,{method : 'PUT'})
                            .then(() => console.log('Todo correcto'))
                            .catch((err) => {console.log(err);})

                        return {ID:id , Name: name, LastNameF:lastNamef , LastNameM:lastNamem, Age:age,catFatherId:catFatherId}
                    }
                }).then((result) => {

                    Swal.fire(`
    Name: ${result.value.Name}
    LastNameF: ${result.value.LastNameF}
    LastNameM: ${result.value.LastNameM}    
    Age: ${result.value.Age}
    catFatherId: ${result.value.catFatherId}
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
                fetch('http://localhost:3001/models/son/destroy_son_orm?id='+id, {method : 'DELETE'})
                    .then(res => console.log(res))
                    .catch((err) => console.error(err))
            }
        })()
    }


    return (
        <React.Fragment>

            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                </TableCell>
                <TableCell  class="text-white"  component="th" scope="row"  align="center">{props.username}</TableCell>
                <TableCell class="text-white"  align="center">{props.LastNameF}</TableCell>
                <TableCell class="text-white"  align="center">{props.lastNameM}</TableCell>
                <TableCell class="text-white"  align="center">{props.age}</TableCell>
                <TableCell class="text-white"  align="center">{props.createdAt}</TableCell>
                <TableCell class="text-white"  align="center"><button  onClick={Add}  className='btn btn-primary'><i className="fa-solid fa-circle-plus"/></button></TableCell>
                <TableCell class="text-white"  align="center"><button onClick={update}  className='btn btn-warning'><i className="fa-solid fa-file-pen"/></button></TableCell>
                <TableCell class="text-white"  align="center"><button onClick={eliminar} className='btn btn-danger'><i className="fas fa-trash-alt"/></button></TableCell>
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
        fetch("http://localhost:3001/models/son/all_son_orm", requestOptions)
            .then(response => response.json())
            .then(result => setList(result))
            .catch(error => console.log('error', error));
    }, [requestOptions])




    return (
        <div>
            <Nav_Bar/>
            <TableContainer sx={{ maxHeight: 250 }} component={Paper}>
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

                        <Row key={row.id} id={row.id} username={row.name} LastNameF={row.lastNamef} lastNameM={row.lastNamem} age={row.age} createdAt={row.createdAt} CatFatherId={row.catFatherId} />
                    ))}
                </TableBody>

            </Table>
        </TableContainer>

        </div>

    )
}
export default CollapsibleTable;