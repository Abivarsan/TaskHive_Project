
import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './Styles/Report.css'
import { getLoggedUserId } from '../../Auth/ApiService';

export default function TaskReport() {


    const [remainTask,setRemainTask] = useState(0);
    const [completeTask,setCompleteTask] = useState(0);
    const [inprogressTask,setInprogressTask] = useState(0);
  
    useEffect(() => {
      const userid=getLoggedUserId();
        fetchDigramData(userid); // Assuming Developer ID is 5, change as necessary
      }, []);
    
      const fetchDigramData = async (developerId) => {
        try {
          const responseremaintask = await axios.get(`http://localhost:5228/api/DeveloperTaskProgressReport/GetRemainingTasks/${developerId}`);
          setRemainTask(responseremaintask.data);
          console.log(remainTask);

          const responsecompletetask = await axios.get(`http://localhost:5228/api/DeveloperTaskProgressReport/GetCompletedTasks/${developerId}`);
          setCompleteTask(responsecompletetask.data);
          console.log(completeTask);

          const responseinprogresstask = await axios.get(`http://localhost:5228/api/DeveloperTaskProgressReport/GetInProgressTasks/${developerId}`);
          setInprogressTask(responseinprogresstask.data);
          console.log(inprogressTask);




       

        } catch (error) {
          console.error('Error fetching diagram data:', error);
        }
      };
      const data = [
        { label: 'Completed Tasks', value: completeTask, color: '#26A69A' },
        { label: 'In Progress Tasks', value: inprogressTask, color: '#5C6BC0' },
        { label: 'Remaining Tasks', value: remainTask, color: '#42A5F5' },
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
    <div className='MainTitle'><h2>Developer Task Progress</h2></div>
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
    <Box display="flex" mt={2} margin="10px" marginLeft="20px">
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
  </div>
  
  )
}
