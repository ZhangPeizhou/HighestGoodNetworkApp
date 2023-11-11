import React from 'react'
import './ET.css';
import * as moment from 'moment'
import { FormGroup, Input, Label, Form, Row, Col, Button } from 'reactstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Select from 'react-select';

function ETUpdateLogInputs({ date, setDate, project, setProject }) {
  const dispatch = useDispatch()
  const projects = [
    {
      "team": [
        {
          "_id": "649f2045e6e8721830f51b60",
          "firstName": "Tim",
          "lastName": "Volunteer",
          "email": "timkentvolunteer@gmail.com"
        },
        {
          "_id": "649f06a8e6e8721830f51a14",
          "firstName": "Tim",
          "lastName": "Core",
          "email": "timkentcore@gmail.com"
        },
        {
          "_id": "64a70af42128bb0ba0133b3b",
          "firstName": "Tim",
          "lastName": "Manager",
          "email": "timkentmanager@gmail.com"
        },
        {
          "_id": "64a710002128bb0ba0133c09",
          "firstName": "Tim",
          "lastName": "Mentor",
          "email": "timkentmentor@gmail.com"
        },
        {
          "_id": "64ab400a5b78211c38b39809",
          "firstName": "Tim",
          "lastName": "Owner",
          "email": "timkentowner@gmail.com"
        }
      ],
      "_id": "65419e61105441587e2dec99",
      "name": "Building 1",
      "isActive": true,
      "template": "Earthbag Village",
      "location": "Sector 1A",
      "buildingManager": {
        "_id": "649e3fc3e6e8721830f515fc",
        "firstName": "Tim",
        "lastName": "Admin",
        "email": "timkentadmin@gmail.com"
      },
      "dateCreated": "2023-11-01T07:00:00.000Z"
    },
    {
      "team": [
        {
          "_id": "649f2045e6e8721830f51b60",
          "firstName": "Tim",
          "lastName": "Volunteer",
          "email": "timkentvolunteer@gmail.com"
        },
        {
          "_id": "649f06a8e6e8721830f51a14",
          "firstName": "Tim",
          "lastName": "Core",
          "email": "timkentcore@gmail.com"
        },
        {
          "_id": "64a70af42128bb0ba0133b3b",
          "firstName": "Tim",
          "lastName": "Manager",
          "email": "timkentmanager@gmail.com"
        },
        {
          "_id": "64a710002128bb0ba0133c09",
          "firstName": "Tim",
          "lastName": "Mentor",
          "email": "timkentmentor@gmail.com"
        },
        {
          "_id": "64ab400a5b78211c38b39809",
          "firstName": "Tim",
          "lastName": "Owner",
          "email": "timkentowner@gmail.com"
        }
      ],
      "_id": "654946b2bc5772e8caf7e962",
      "name": "Building 2",
      "isActive": true,
      "template": "Earthbag Village",
      "location": "Sector 1B",
      "buildingManager": {
        "_id": "649e3fc3e6e8721830f515fc",
        "firstName": "Tim",
        "lastName": "Admin",
        "email": "timkentadmin@gmail.com"
      },
      "dateCreated": "2023-11-06T07:00:00.000Z"
    },
    {
      "team": [
        {
          "_id": "649f2045e6e8721830f51b60",
          "firstName": "Tim",
          "lastName": "Volunteer",
          "email": "timkentvolunteer@gmail.com"
        },
        {
          "_id": "649f06a8e6e8721830f51a14",
          "firstName": "Tim",
          "lastName": "Core",
          "email": "timkentcore@gmail.com"
        },
        {
          "_id": "64a70af42128bb0ba0133b3b",
          "firstName": "Tim",
          "lastName": "Manager",
          "email": "timkentmanager@gmail.com"
        },
        {
          "_id": "64a710002128bb0ba0133c09",
          "firstName": "Tim",
          "lastName": "Mentor",
          "email": "timkentmentor@gmail.com"
        },
        {
          "_id": "64ab400a5b78211c38b39809",
          "firstName": "Tim",
          "lastName": "Owner",
          "email": "timkentowner@gmail.com"
        },
        {
          "_id": "649e3fc3e6e8721830f515fc",
          "firstName": "Tim",
          "lastName": "Admin",
          "email": "timkentadmin@gmail.com"
        }
      ],
      "_id": "654946c8bc5772e8caf7e963",
      "name": "Building 3",
      "isActive": true,
      "template": "Earthbag Village",
      "location": "Sector 2A",
      "buildingManager": {
        "_id": "649f2045e6e8721830f51b60",
        "firstName": "Tim",
        "lastName": "Volunteer",
        "email": "timkentvolunteer@gmail.com"
      },
      "dateCreated": "2023-11-06T07:00:00.000Z"
    }
  ]
  //useSelector(state => state.bmProjects.projects)
  const [formattedProjects, setFormattedProjects] = useState([]);
  const today = moment(new Date()).format('YYYY-MM-DD')

  useEffect(() => {
    let _formattedProjects = [{ label: 'All Projects', value: '0' }];
    let tempProjs = projects.map((proj) => {
      return { label: proj.name, value: proj._id }
    })
    _formattedProjects = _formattedProjects.concat(tempProjs)
    setFormattedProjects(_formattedProjects);
  }, []); //projects

  const dateHandler = (e) => {
    let newDate = moment(e.target.value).format('YYYY-MM-DD')
    setDate(newDate)
  }
  const changeProjectHandler = (selectedOption) => {
    let proj = selectedOption;
    setProject(proj);
  }
  return (
    <div className='container'>

      <Form >
        <Row className="align-items-center logMaterialInputRow">
          <Col lg={6} md={12} className='logMaterialInputCol'>
            <Row className="justify-content-start align-items-center">
              <Label
                for="selectdate"
                lg={2} md={3}
              >
                Date:
              </Label>
              <Col lg={10} md={9}>
                <Input max={today} value={date} onChange={dateHandler} id='selectdate' name='select' type="date">
                </Input>
              </Col>
            </Row>
          </Col>

          <Col lg={6} md={12} className='logMaterialInputCol'>
            <Row className="justify-content-start align-items-center">
              <Label lg={2} md={3} for="selectproject">
                Project:
              </Label>
              <Col lg={10} md={9} >
                <Select
                  onChange={changeProjectHandler}
                  options={formattedProjects}
                  defaultValue={{ label: 'All Projects', value: '0' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>


      </Form>

    </div>
  )
}

export default ETUpdateLogInputs
