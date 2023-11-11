import React from 'react'
import { Container } from 'reactstrap'
import './ET.css';
import ETUpdateLogInputs from './ETUpdateLogInputs';
import { useState } from 'react';
import moment from 'moment';
import ETUpdateTable from './ETUpdateTable';

function ETUpdateLog() {
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [project, setProject] = useState('All Projects');
  return (
    <div>
      <Container fluid className='logMaterialContainer'>
        <div className='logMaterialPage'>
          <div className='logMaterial'>
            <div className='logMaterialTitle'>EQUIPMENT/TOOL UPDATE LOG FORM</div>
            <ETUpdateLogInputs project={project} setProject={setProject} date={date} setDate={setDate} />
            <ETUpdateTable />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ETUpdateLog
