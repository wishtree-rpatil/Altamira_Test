import react, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const CrudOpration = () => {

    const [name, setName] = useState("");
    const [nameList, setNameList] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [thirdPartyList, setThirdPartyList] = useState([]);

    useEffect(() => {
        console.log("Use Effecr called")
        handleGetList();
    },[]);

    const handleGetList = () => {
        axios.get('https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001').then((response) => {
            console.log("API response")
            console.log(response)
            setThirdPartyList([...response.data])
        }).catch((error) => {
            console.log("error");
            console.log(error);
        })
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleAddName = () => {
        if (name == "") {
            alert("Please Enter name")
        }
        else {
            let tempList = nameList
            tempList.push(name);
            setNameList([...tempList]);
            setName("");
        }
    }

    const handleUpdateName = () => {
        let tempArray = nameList;
        tempArray[selectedIndex] = name;
        setNameList([...tempArray]);
        setName("");
        setSelectedIndex(null);
        setUpdateMode(false);
    }

    const handleThirdPartyUpdateName = () => {
        let tempArray = thirdPartyList;
        tempArray[selectedIndex].firstName = name;
        setThirdPartyList([...tempArray]);
        setName("");
        setSelectedIndex(null);
        setUpdateMode(false);
    }

    const handleDeleteName = (id) => {
        let tempArray = nameList;
        tempArray.splice(id, 1);
        setNameList([...tempArray])
    }

    const handleViewName = (index) => {
        let selectedName = nameList[index];
        setName(selectedName);
        setSelectedIndex(index);
        setUpdateMode(true);
    }

    const handleThirdPartyViewName = (id) => {
        let selectedName = thirdPartyList[id];
        setName(selectedName.firstName);
        setSelectedIndex(id);
        setUpdateMode(true);
    }
 
    return (
        <div>
            <div className='Form_section'>
                <TextField
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    value={name}
                    onChange={handleChangeName} />

                {!updateMode ? <Button variant="contained" onClick={handleAddName}>+Add</Button>
                 :<Button variant="contained" onClick={handleThirdPartyUpdateName}>Update</Button>}
            </div>

            {/* <div >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {nameList && nameList.length > 0 && nameList.map((name, index) => (
                                <TableRow
                                    key={name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">
                                        
                                        <p onClick={() => handleViewName(index)}>{name}</p> 
                                    </TableCell>
                                    <TableCell align="left" >
                                       <p onClick={() => handleDeleteName(index)}>Delete</p> 
                                       
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> */}

            <div >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No</TableCell>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="left">Last Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {thirdPartyList && thirdPartyList.length > 0 && thirdPartyList.map((data, index) => (
                                <TableRow
                                    
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">
                                        {data.id}
                                    </TableCell>
                                    <TableCell align="left" onClick={() => handleThirdPartyViewName(index)}>
                                    {data.firstName}
                                    </TableCell>
                                    <TableCell align="left" > 
                                    {data.lastName}                                      
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default CrudOpration;