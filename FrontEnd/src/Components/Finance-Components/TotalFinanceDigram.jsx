import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarsDataset() {
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  useEffect(() => {
    var year = getCurrentYear();
    getData(year);
  }, []);

  const getData = async (year) => {
    try {
      const response = await axios.get(`http://localhost:5228/api/TotalIncomeExpence?year=${year}`);
      console.log(response.data);
      setIncomeExpenseData(transformData(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const transformData = (data) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return data.map((item, index) => ({
      month: monthNames[index],
      income: item.income,
      expense: item.expence
    }));
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={incomeExpenseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis 
          label={{ 
            value: 'Rupees(Rs)', 
            angle: -90, 
            position: 'insideLeft',
            dx: -20 // Adjust this value to move the label more to the left
          }} 
        />
        <Tooltip formatter={(value) => `${value}Rs`} />
        <Legend />
        <Bar dataKey="income" fill="#8884d8" name="Income" />
        <Bar dataKey="expense" fill="#82ca9d" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
}
