import React from 'react'
import './ET.css';
import { Button, Table } from 'reactstrap';

function ETUpdateTable() {
  return (
    <div>
      <Table borderless className='logMaterialTable' responsive >
        <thead className='logMTableHeaderLine'>
          <tr className="table-light">
            <th>SID</th>
            <th>Submit Time</th>
            <th>PID</th>
            <th>ID</th>
            <th >Num</th>
            <th >Name</th>
            <th className='logMTableHead'>Previous</th>
            <th className='logMTableHead'>Current </th>
            <th className='logMTableHead'>Replace</th>
            <th >Last Used </th>
            <th >Description</th>
          </tr>
        </thead>
        <tbody >
          <tr >
            <td>1</td>
            <td>11/11/2023</td>
            <td>P1</td>
            <td >T1</td>
            <td >#1</td>
            <td >Brush</td>
            <td >Working Well </td>
            <td >Broken</td>
            <td >Yes </td>
            <td >Jane</td>
            <td>N/A</td>
          </tr>
          <tr >
            <td>1</td>
            <td>11/11/2023</td>
            <td>P1</td>
            <td >T1</td>
            <td >#1</td>
            <td >Brush</td>
            <td >Working Well </td>
            <td >Broken</td>
            <td >Yes </td>
            <td >Jane</td>
            <td>N/A</td>
          </tr>
          <tr >
            <td>1</td>
            <td>11/11/2023</td>
            <td>P1</td>
            <td >T1</td>
            <td >#1</td>
            <td >Brush</td>
            <td >Working Well </td>
            <td >Broken</td>
            <td >Yes </td>
            <td >Jane</td>
            <td>N/A</td>
          </tr>
          <tr >
            <td>1</td>
            <td>11/11/2023</td>
            <td>P1</td>
            <td >T1</td>
            <td >#1</td>
            <td >Brush</td>
            <td >Working Well </td>
            <td >Broken</td>
            <td >Yes </td>
            <td >Jane</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </Table>
      <div style={{ marginRight: '0px', marginLeft: '0px' }} className='row justify-content-between '>
        <Button size="md" className='logMButtons' outline >Cancel</Button>
        <Button size="md" className='logMButtonBg' >Submit</Button>
      </div>
    </div>
  )
}

export default ETUpdateTable
