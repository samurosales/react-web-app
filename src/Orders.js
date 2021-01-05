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

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

let rows = [];
let data01 = []
let data02 = []
let data03 = []
let data04 = []

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
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${data01[index].name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderCustomizedLabel2 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${data02[index].name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderCustomizedLabel3 = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${data03[index].name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Orders() {

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("patientsMessage", data => {
        rows = JSON.parse(data)


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

        data01.sort(function(a, b){return b.value-a.value})

        data02 = Object.entries(rows.reduce((obj, value)=>{
          if(!obj[value.infected_type]){
            obj[value.infected_type] = 1
          }else{
            obj[value.infected_type] += 1
          }
          return obj
        },{})).map((value)=>{
          return { name: value[0], value: value[1]}
        })
        
        data03 = Object.entries(rows.reduce((obj, value)=>{
          if(!obj[value.state]){
            obj[value.state] = 1
          }else{
            obj[value.state] += 1
          }
          return obj
        },{})).map((value)=>{
          return { name: value[0], value: value[1]}
        })


        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://us-central1-sopes1-dic2020.cloudfunctions.net/Redis-API/lastFive' // site that doesn’t send Access-Control-*
        fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then((contents) => {

        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

     
        

        // console.log(jsonData)
        setResponse("\nPatients")
        // console.log(data, 'datos')
    });
  }, []);


  const classes = useStyles();
  return (
    <React.Fragment>

      <PieChart width={930} height={900}>
        <Pie data={data01} dataKey="value" outerRadius={170} fill="#677f8d" label={renderCustomizedLabel} labelLine={false}/>
        <Pie data={data02} dataKey="value" innerRadius={210} outerRadius={255} fill="#8eabbd" label={renderCustomizedLabel2} labelLine={false}/>
        <Pie data={data03} dataKey="value" innerRadius={320} outerRadius={350} fill="#abcbdf" label={renderCustomizedLabel3} labelLine={false}/>
      </PieChart>

          	{/* <PieChart width={800} height={400} >
        <Pie
          data={data01} 
          cx={300} 
          cy={200} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart> */}
      <Title>Last 5 - Patients</Title>
      <Table size="small">
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
          {data04.map((data04) => (
            <TableRow>
              <TableCell>{data04.name}</TableCell>
              <TableCell>{data04.location}</TableCell>
              <TableCell>{data04.age}</TableCell>
              <TableCell>{data04.infected_type}</TableCell>
              <TableCell align="right">{data04.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
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
          {data01.slice(0,3).map((data01) => (
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
 

 
      <Title>{response}</Title>
      <Table size="small">
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
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.infected_type}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders 
        </Link>
      </div>
    </React.Fragment>
  );
}
