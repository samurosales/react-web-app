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
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts';


// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}


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

     // .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

        const url = 'https://us-central1-sopes1-dic2020.cloudfunctions.net/Redis-API/lastFive' // site that doesn’t send Access-Control-*
        fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.json())
        .then(data => {
          data04 = data.map((value)=>{
            return JSON.parse(value)
          })
          
        })
        .catch(console.error);
         
        const url2 = 'https://us-central1-sopes1-dic2020.cloudfunctions.net/Redis-API/ageGraph' // site that doesn’t send Access-Control-*
        fetch(url2) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.json())
        .then(data => {
          data05 = data
          console.log(data05,"^^^^")
          // console.log(data04)
          setResponse("\nPatients")
        })
        .catch(console.error);
         

        // console.log(jsonData)
        
        // console.log(data, 'datos')
    });
  }, []);







  const classes = useStyles();
  return (
    <React.Fragment>



<h3>Mongo Data Graph</h3>

<PieChart width={930} height={900}>
        <Pie data={data01} dataKey="value" outerRadius={170} fill="#677f8d" label={renderCustomizedLabel} labelLine={false}/>
        <Pie data={data02} dataKey="value" innerRadius={210} outerRadius={255} fill="#8eabbd" label={renderCustomizedLabel2} labelLine={false}/>
        <Pie data={data03} dataKey="value" innerRadius={320} outerRadius={350} fill="#abcbdf" label={renderCustomizedLabel3} labelLine={false}/>
      </PieChart>

<h3>Age Graph</h3>
        <BarChart 
              data={data05}
              layout="vertical" barCategoryGap={1}
              // margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
              width={730} height={300}
              >
        <XAxis type="number" hide />
        <YAxis type="category" width={40} padding={{ left: 200 }} dataKey="name"/>
            
        <Bar 
           dataKey="value" 
           fill="#323232"
           label
           barSize={20}
           />
           
      </BarChart>
   

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
          {data04.map((data) => (
            <TableRow>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.location}</TableCell>
              <TableCell>{data.age}</TableCell>
              <TableCell>{data.infected_type}</TableCell>
              <TableCell align="right">{data.state}</TableCell>
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
