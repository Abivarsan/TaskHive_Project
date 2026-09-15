
import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './Styles/Report.css'
import { useLocation, useNavigate } from "react-router-dom";


function TimeReport() {


    const [remain,setRemain] = useState(0);
    const [complete,setComplete] = useState(0);
    const location=useLocation();
   const selectedId = location.state.newTimeSelectedId;

    useEffect(() => {
        fetchDigramData(selectedId); // Assuming project ID is 7, change as necessary
      }, []);
    
      const fetchDigramData = async (projectId) => {
        try {
          const responseremain = await axios.get(`http://localhost:5228/api/TimeProgressReport/ProjectProgressReportRemain/${projectId}`);
          setRemain(responseremain.data);
          console.log(remain);

          const responsecomplete = await axios.get(`http://localhost:5228/api/TimeProgressReport/ProjectProgressReportComplete/${projectId}`);
          setComplete(responsecomplete.data);
          console.log(complete);
          


        } catch (error) {
          console.error('Error fetching diagram data:', error);
        }
      };

      console.log(remain);
      console.log(complete);


      const data = [
        { label: 'Project Remaining Time', value: remain, color: '#00E5FF' },
        { label: 'Project Completed Time', value: complete, color: '#1A237E' },
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
<div className='Main'>
    <div className='MainTitle'><h2>Time Progress Report</h2></div>

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
          fontSize: 16,
        },
      }}
      {...sizing}
    />
      <Box display="flex" flexDirection="column" alignItems="left">
    <Box display="flex" mt={2} margin="10px" marginLeft="20px">
      {data.map((item) => (
        <Box key={item.label} display="flex" alignItems="center" mr={2}>
          <Box
            width={30}
            height={30}
            bgcolor={item.color}
            mr={1}
            borderRadius="5px"
          />
          <Typography variant="body1">{item.label}</Typography>
        </Box>
      ))}
    </Box>
  </Box>

  </div>
);
}

export default TimeReport