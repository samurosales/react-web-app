import React, { useState, useEffect }  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Async from 'react-async';
import { PieChart, Pie, Cell, sector } from 'recharts';
// import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts';


import axios from 'axios'

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, name,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieRealChart=()=> {
  const [posts, setPosts]=useState([[]])

  const getPosts = async () => {
      try {const userPosts = await axios.get("https://node-mongo-service-tko2cvu2ea-uc.a.run.app/mongoGraph")
        
        setPosts(userPosts.data);  // set State
      
      } catch (err) {
        console.error(err.message);
      }
  };


    useEffect(()=>{
    
      getPosts()

    const interval=setInterval(()=>{
      getPosts()
    },3000)
       
       
     return()=>clearInterval(interval)

    },[])  // includes empty dependency array


    return (
        <div>
          
        <h3>Mongo Data Graph</h3>

      <PieChart width={930} height={900}>
        <Pie data={posts[0]} dataKey="value" outerRadius={170} fill="#677f8d" label={renderCustomizedLabel}labelLine={false}/>
        
        <Pie data={posts[1]} dataKey="value" innerRadius={210} outerRadius={255} fill="#8eabbd" label={renderCustomizedLabel} labelLine={false}/>
        <Pie data={posts[2]} dataKey="value" innerRadius={320} outerRadius={350} fill="#abcbdf" label={renderCustomizedLabel} labelLine={false}/>
      </PieChart>

        </div>
    );

}






// // We'll request user data from this API
// const loadUsers = () =>
//   fetch('https://us-central1-sopes1-dic2020.cloudfunctions.net/Redis-API/lastFive')
//     .then(res => (res.ok ? res : Promise.reject(res)))
//     .then(res => res.json())

// // Our component
// function Chart() {
//   return (
//     <div className="container">
//       <Async promiseFn={loadUsers}>
//         {({ data, err, isLoading }) => {
//           if (isLoading) return "Loading..."
//           if (err) return `Something went wrong: ${err.message}`

//           if (data)
//             return (
//               <div>
//                 <div>
//                   <h2>React Async - Random Users</h2>
//                 </div>
                
//                     {/* {(JSON.parse(`[${data}]`))} */}
//                       <Title>Last 5 - Patients</Title>

//                       <Table size="small">
//                         <TableHead>
//                           <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Location</TableCell>
//                             <TableCell>Age</TableCell>
//                             <TableCell>Infected Type</TableCell>
//                             <TableCell align="right">State</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {(JSON.parse(`[${data}]`)).map((data) => (
//                             <TableRow>
//                               <TableCell>{data.name}</TableCell>
//                               <TableCell>{data.location}</TableCell>
//                               <TableCell>{data.age}</TableCell>
//                               <TableCell>{data.infected_type}</TableCell>
//                               <TableCell align="right">{data.state}</TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>

//               </div>
//             )
//         }}
//       </Async>
//     </div>
//   );
// }

export default PieRealChart;