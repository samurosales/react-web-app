import React, { useState, useEffect }  from 'react';
import { useTheme } from '@material-ui/core/styles';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Title from './Title';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

    let  COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    let pieData = [];

    let CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }

        return null;
    };

export default function Chart() {


  const theme = useTheme();
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('patientsGraph', data => {
      // setResponse(data);
        let info = JSON.parse(data)
        let aux = {}
        for(value of info){
            if(!aux[value.location]){
                aux[value.location] = info.filter((obj) => obj.location === value.location).length;
            }
        }
        console.log(aux)
        setResponse("hola")
        // console.log(data, 'datos')
    });
  }, []);

  

  return (
    <React.Fragment>
      <Title>{response}</Title>
        <PieChart width={730} height={300}>
                <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                    {
                        pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
    </React.Fragment>
  );
}
