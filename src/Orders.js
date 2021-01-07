import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title.js';
import { PieChart, Pie, Cell, sector } from 'recharts';
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://node-mongo-service-tko2cvu2ea-uc.a.run.app";
import { DataGrid } from '@material-ui/data-grid';


// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}
/*            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Infected Type</TableCell>
            <TableCell align="right">State</TableCell>
             */
const columns = [
  { field: 'id', headerName: 'Id', width: 130, hide:true},
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'location', headerName: 'Location', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  { field: 'infected_type', headerName: 'Infected Type', width: 200 },
  { field: 'state', headerName: 'State', width: 130 },
 
];

let rows = [];
let data01 = []
let data02 = []

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

// const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
//                   {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];




export default function Orders() {

  // const [response, setResponse] = useState("");
  const [allData, setAllData]=useState([[]])

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("patientsMessage", data => {
        rows = JSON.parse(data)
        rows = rows.map((rowData)=>{
          rowData.id = rowData._id
          return rowData
        })

        data01 = Object.entries(rows.reduce((obj, value)=>{
          if(!obj[value.location]){
            obj[value.location] = 1
          }else{
            obj[value.location] += 1
          }
          return obj
        },{})).map((value)=>{
          return { name: value[0], value: value[1]}
        })

        data01 = data01.sort(function(a, b){return b.value-a.value})





        setAllData([rows])



    });
  }, []);







  const classes = useStyles();
  return (
    <React.Fragment>

      



      <Title>Top 3 - Locations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          Object.entries(allData[0].reduce((obj, value)=>{
            if(!obj[value.location]){
              obj[value.location] = 1
            }else{
              obj[value.location] += 1
            }
            return obj
          },{})).map((value)=>{
            return { name: value[0], value: value[1]}
          })
          .sort(function(a, b){return b.value-a.value})
          .slice(0,3).map((data01) => (
            <TableRow>
              <TableCell>{data01.name}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{data01.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
 

    <Title>Patients</Title>


    <div style={{ height: 800, width: '100%' }}>
      <DataGrid  rows={allData[0]} columns={columns} pageSize={13} checkboxSelection />
    </div>

    <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders 
        </Link>
      </div>

    </React.Fragment>
  );
}
