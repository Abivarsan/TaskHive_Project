
import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function PieCharts(props) {
  const [remaining, setRemaining] = useState(0);
  const [used, setUsed] = useState(0);

  const projectId= props.projectid;

  useEffect(() => {
    fetchDigramData(projectId); 
  }, [projectId]);

  const fetchDigramData = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:5228/api/FinanceDigram/Projects/${projectId}/register`);
      const data = response.data;
      console.log(data)
      setRemaining(data.remaining);
      setUsed(data.used);
    } catch (error) {
      console.error('Error fetching diagram data:', error);
    }
  };

  const data = [
    { label: 'Used(Rs)', value: used, color: '#0088FE' },
    { label: 'Remaining(Rs)', value: remaining, color: '#00C49F' },
  ];

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };
  const sizing = {
  margin: { right: 10 },
  width: 400,
  height: 400,
  legend: { hidden: true },
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="left">
      <PieChart
        series={[
          {
            outerRadius: 190,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 14,
          },
        }}
        {...sizing}
      />
      <Box display="flex" mt={2} margin="10px" marginLeft="120px">
        {data.map((item) => (
          <Box key={item.label} display="flex" alignItems="center" mr={2}>
            <Box
              width={20}
              height={20}
              bgcolor={item.color}
              mr={1}
              borderRadius="4px"
            />
            <Typography variant="body1">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
