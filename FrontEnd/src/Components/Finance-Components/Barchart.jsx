import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

export default function BasicBars(props) {
    const [Income,setIncome] = useState(0);
    const [Expence,setExpence] = useState(0);


   const projectId=props.projectid;
    useEffect(() => {
      fetchBardata(projectId); // Assuming project ID is 11, change as necessary
    }, [projectId]);
  
    const fetchBardata = async (projectId) => {
      try {
        const response = await axios.get(`http://localhost:5228/api/FinanceDigram/Projects/${projectId}/register`);
        const data = response.data;
        console.log(data)
        setIncome(data.income);
        setExpence(data.used);
      } catch (error) {
        console.error('Error fetching diagram data:', error);
      }
    };
    const data = [
      { name: 'Total Income', value:Income, fill: '#4CAF50' }, // Green for income
      { name: 'Total Expense', value: Expence, fill: '#FF5722' }  // Orange for expense
    ];
  return (
    <BarChart
    width={400}
    height={500}
    data={data}
    margin={{
      top: 20, right: 30, left: 20, bottom: 5,
    }}
  >
            <YAxis 
          label={{ 
            value: 'Rupees(Rs)', 
            angle: -90, 
            position: 'insideLeft',
            dx: -17
          }} 
        />
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" />
  </BarChart>
  );
}
