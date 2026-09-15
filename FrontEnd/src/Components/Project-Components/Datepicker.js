import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepickerStyle.css';

const Datepicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    return (
      <Form>
        <Form.Group controlId="formDate">
          <DatePicker
            className='datepicker'
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            // You can customize the date format and other options
          />
        </Form.Group>
      </Form>
    );
  };
  
  export default Datepicker;
  