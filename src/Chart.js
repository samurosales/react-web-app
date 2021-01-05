import React, { useState, useEffect }  from 'react';
import { useTheme } from '@material-ui/core/styles';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Title from './Title';
import Async from 'react-async';

// We'll request user data from this API
const loadUsers = () =>
  fetch('https://us-central1-sopes1-dic2020.cloudfunctions.net/Redis-API/lastFive')
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

// Our component
function Chart() {
  return (
    <div className="container">
      <Async promiseFn={loadUsers}>
        {({ data, err, isLoading }) => {
          if (isLoading) return "Loading..."
          if (err) return `Something went wrong: ${err.message}`

          if (data)
            return (
              <div>
                <div>
                  <h2>React Async - Random Users</h2>
                </div>
                {data.map(user=> (
                  <div className="row">
                    <div className="col-md-12">
                      <p>{user.name}</p>
                      <p>{user.state}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
        }}
      </Async>
    </div>
  );
}

export default Chart;