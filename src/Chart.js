import React, { useState, useEffect }  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Async from 'react-async';

import axios from 'axios'


const Chart=()=> {
  const [posts, setPosts]=useState([])

  const getPosts = async () => {
      try {const userPosts = await axios.get("https://us-central1-sopes1-dic2020.cloudfunctions.net/Redis-API/lastFive")
        
        setPosts(userPosts.data);  // set State
      
      } catch (err) {
        console.error(err.message);
      }
  };


    useEffect(()=>{
    
      getPosts()

    const interval=setInterval(()=>{
      getPosts()
    }, 1500)
       
       
     return()=>clearInterval(interval)

    },[])  // includes empty dependency array


    return (
        <div>

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
                {(JSON.parse(`[${posts}]`)).map((data) => (
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

export default Chart;