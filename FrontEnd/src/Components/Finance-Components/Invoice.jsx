import React, { useEffect ,useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import "./Styles/Invoicestyles.css";
import InvoiceEdit from './InvoiceEdit';
import jsPDF from "jspdf";


function Invoice(props) {
    const {projectId}=props;
    const[transacdata,setTransacdata]=useState([]);
    
    useEffect(()=>{
      if(projectId){
        fetchTransaction(projectId);
      }
    },[projectId]);

   const fetchTransaction= async (projectId)=>{
    try{
        const response= await axios.get(`http://localhost:5228/api/Transaction/Projects/${projectId}/register`)
        console.log("Transacdara",JSON.stringify(response.data))
        setTransacdata(response.data)
       
    }catch (error) {
        console.error("Error fetching budget data:", error);
    }
};
const deletetransac =async (transacId)=>{
  try{
    if(window.confirm("Are you sure you need to delete this item"))
    await axios.delete(`http://localhost:5228/api/Transaction/Transaction/${transacId}/${projectId}/register`);
    setTransacdata(transacdata.filter(item => item.transacId !== transacId));
    alert("Deleted Successfully")
  }catch(error){
    console.error('Error deleting transaction:', error);
  }
};
const downloadPDF = () => {
  const doc = new jsPDF();
  doc.text('Invoice Report', 14, 22);
  
  // Adding headers
  const headers = [
      { title: "Description", posX: 14, posY: 40 },
      { title: "Date", posX: 50, posY: 40 },
      { title: "Value", posX: 80, posY: 40 },
      { title: "Total Income", posX: 110, posY: 40 },
      { title: "Total Expense", posX: 140, posY: 40 }
  ];
  
  headers.forEach(header => {
      doc.setFontSize(12);
      doc.setTextColor(255);
      doc.setFillColor(0, 128, 0);
      doc.rect(header.posX, header.posY - 6, 30, 10, 'F');
      doc.text(header.title, header.posX + 1, header.posY);
  });

  // Adding data rows
  let posY = 50;
  transacdata.forEach(item => {
      doc.setFontSize(10);
      doc.setTextColor(0);

      doc.text(item.description, 14, posY);
      doc.text(new Date(item.date).toLocaleDateString(), 50, posY);
      doc.text(item.value.toString(), 80, posY);
      doc.text(item.income.toString(), 110, posY);
      doc.text(item.expence.toString(), 140, posY);

      posY += 10;
  });
  const pageHeight= doc.internal.pageSize.height  //get height
  const posYSignature= posY+20; 
   doc.setFontSize (10)
   doc.text("Signature",15,posYSignature) ;
   doc.line(15, posYSignature+8, 50, posYSignature+8);  
   const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; 
  doc.text(formattedDate,15,posYSignature-8) ;  

  doc.setFont('Courier'); 
  doc.setFontSize(40); 
  doc.text('Thank you', 70, pageHeight - 40);

  doc.save('Invoice.pdf');
};

   
  return (
    <div>
        
      <div className="transacform"> 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table" id="invoicetable">
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={3}>
                <TableCell align="left"><b><u>Invoice Report</u></b></TableCell>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}><b>Discription</b></TableCell>
                <TableCell colSpan={2}><b>Date</b></TableCell>
                <TableCell colSpan={3}><b>Value</b></TableCell>
                <TableCell colSpan={4}><b>Total Income</b></TableCell>
                <TableCell colSpan={5}><b>Total Expence</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transacdata.map((item,index)=>(
                <TableRow key={index}>
                  <TableCell align='left' colSpan={1}>{item.description}</TableCell>
                  <TableCell align='left' colSpan={2}>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell align='left' colSpan={3}>{item.value}</TableCell>
                  <TableCell align='left' colSpan={4}>{item.income}</TableCell>
                  <TableCell align='left' colSpan={5}>{item.expence}</TableCell>
                  <TableCell align='left' colSpan={6}><InvoiceEdit transacId={item.transacId} discription={item.description} tvalue={item.value}/></TableCell>
                  <TableCell align='left' colSpan={7}><Button onClick={() => deletetransac(item.transacId)}  
                    className='deletebutton' style={{backgroundColor:'red'}}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="iprintbtn">
                <Button variant="primary" type="button" id="usubmit" onClick={downloadPDF} 
                style={{ backgroundColor: '#20C997', color: 'white'  }} className="printb">Print</Button>
            </div>
    </div>
  )
}


export default Invoice