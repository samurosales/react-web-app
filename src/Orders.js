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
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts';


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
let data03 = []
let data04 = []
let data05 = []
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

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderCustomizedLabel2 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderCustomizedLabel3 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name}) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Orders() {

  // const [response, setResponse] = useState("");
  const [allData, setAllData]=useState([])

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("patientsMessage", data => {
        rows = JSON.parse(data)
        rows = rows.map((rowData)=>{
          rowData.id = rowData._id
          return rowData
        })

        // data01 = Object.entries(rows.reduce((obj, value)=>{
        //   if(!obj[value.location]){
        //     obj[value.location] = 1
        //   }else{
        //     obj[value.location] += 1
        //   }
        //   return obj
        // },{})).map((value)=>{
        //   return { name: value[0], value: value[1]}
        // })

        // data01.sort(function(a, b){return b.value-a.value})

        

        // data02 = Object.entries(rows.reduce((obj, value)=>{
        //   if(!obj[value.infected_type]){
        //     obj[value.infected_type] = 1
        //   }else{
        //     obj[value.infected_type] += 1
        //   }
        //   return obj
        // },{})).map((value)=>{
        //   return { name: value[0], value: value[1]}
        // })


        
        
        // data03 = Object.entries(rows.reduce((obj, value)=>{
        //   if(!obj[value.state]){
        //     obj[value.state] = 1
        //   }else{
        //     obj[value.state] += 1
        //   }
        //   return obj
        // },{})).map((value)=>{
        //   return { name: value[0], value: value[1]}
        // })

        setAllData(rows)

        // setPosts({})

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

     // .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

        // const url = 'https://us-central1-sopes1-dic2020.cloudfunctions.net/Redis-API/lastFive' // site that doesn’t send Access-Control-*
        // fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
        // .then(response => response.json())
        // .then(data => {
        //   data04 = data.map((value)=>{
        //     return JSON.parse(value)
        //   })
          
        // })
        // .catch(console.error);
         
        // const url2 = 'https://us-central1-sopes1-dic2020.cloudfunctions.net/Redis-API/ageGraph' // site that doesn’t send Access-Control-*
        // fetch(url2) // https://cors-anywhere.herokuapp.com/https://example.com
        // .then(response => response.json())
        // .then(data => {
        //   data05 = data
        //   // console.log(data05,"^^^^")
        //   // console.log(data04)
          
        // })
        // .catch(console.error);
         
        // console.log(jsonData)
        
        // console.log(data, 'datos')
    });
  }, []);







  const classes = useStyles();
  return (
    <React.Fragment>

      
      <h3>Mongo Data Graph</h3>

      <PieChart width={930} height={900}>
        <Pie data={Object.entries(allData.reduce((obj, value)=>{
          if(!obj[value.location]){
            obj[value.location] = 1
          }else{
            obj[value.location] += 1
          }
          return obj
        },{})).map((value)=>{
          return { name: value[0], value: value[1]}
        })} dataKey="value" outerRadius={170} fill="#677f8d" label={renderCustomizedLabel} labelLine={false}/>
        
        <Pie data={Object.entries(allData.reduce((obj, value)=>{
          if(!obj[value.infected_type]){
            obj[value.infected_type] = 1
          }else{
            obj[value.infected_type] += 1
          }
          return obj
        },{})).map((value)=>{
          return { name: value[0], value: value[1]}
        })} dataKey="value" innerRadius={210} outerRadius={255} fill="#8eabbd" label={renderCustomizedLabel2} labelLine={false}/>
        <Pie data={Object.entries(allData.reduce((obj, value)=>{
          if(!obj[value.state]){
            obj[value.state] = 1
          }else{
            obj[value.state] += 1
          }
          return obj
        },{})).map((value)=>{
          return { name: value[0], value: value[1]}
        })} dataKey="value" innerRadius={320} outerRadius={350} fill="#abcbdf" label={renderCustomizedLabel3} labelLine={false}/>
      </PieChart>


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
          Object.entries(allData.reduce((obj, value)=>{
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
      {/* <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Infected Type</TableCell>
            <TableCell align="right">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allData.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.infected_type}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}

    <div style={{ height: 800, width: '100%' }}>
      <DataGrid id={Math.random()} rows={allData} columns={columns} pageSize={13} checkboxSelection />
    </div>

    <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders 
        </Link>
      </div>

    </React.Fragment>
  );
}
