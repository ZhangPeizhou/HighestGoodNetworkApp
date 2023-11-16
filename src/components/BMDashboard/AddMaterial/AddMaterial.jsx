import React from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Button, CardBody, Card } from 'reactstrap'
import './AddMaterial.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllBuildingInventoryMaterialTypes } from 'actions/bmdashboard/bmInventoryTypeActions';
import { useState } from 'react';
import MaterialTypesList from './MaterialTypesList';

function AddMaterial() {
  const dispatch = useDispatch();
  const buildingInventoryTypes = useSelector(state => state.buildingInventoryTypes)
  const [material, setMaterial] = useState({
    name: '',
    unit: '',
    customUnit: '',
    description: ''

  })
  const changeHandler = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    material[field] = value;
    if (field == 'customUnit') {
      if (value) {
        material.unit = 'customUnit'
      }
    }
    if (field == 'unit') {
      if (value != 'customUnit') {
        material.customUnit = ''
      }
    }
    setMaterial({ ...material });
  }
  useEffect(() => {
    dispatch(fetchAllBuildingInventoryMaterialTypes());
  }, [])
  return (
    <div>
      <Container fluid className='materialContainer'>
        <div className='materialPage'>
          <div className='material'>
            <Card>
              <CardBody>
                <Form id="AddMaterialForm">
                  <FormGroup row className='align-items-center justify-content-start'>
                    <Label
                      for=""
                      lg={2} sm={4}
                      className='materialFormLabel'
                    >
                      Item Type
                    </Label>
                    <Col lg={4} sm={8} className='materialFormValue'>
                      <Input
                        id=""
                        name=""
                        type="text"
                        placeholder='Material Name'
                        value={'Material'}
                        disabled={true}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className='align-items-center justify-content-start'>
                    <Label
                      for="name"
                      lg={2} sm={4}
                      className='materialFormLabel'
                    >
                      Material Name
                    </Label>
                    <Col lg={4} sm={8} className='materialFormValue'>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={material.name}
                        onChange={(e) => changeHandler(e)}
                        placeholder='Material Name'
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row className='align-items-center justify-content-start'>
                    <Label
                      for="unit"
                      lg={2} sm={4}
                      className='materialFormLabel'
                    >
                      Material Unit
                    </Label>
                    <Col lg={4} sm={8} className='materialFormValue'>
                      <Input
                        id="unit"
                        name="unit"
                        type="select"
                        value={material.unit}
                        onChange={(e) => changeHandler(e)}
                      >
                        <option value={'customUnit'} key={'customUnit'}>--Please select unit--</option>
                        {
                          buildingInventoryTypes.result?.map((matType) =>
                            <option key={matType._id} value={matType.name}>{matType.name}</option>
                          )
                        }
                      </Input>
                    </Col>
                  </FormGroup>

                  <FormGroup row className='align-items-center justify-content-start'>
                    <Label
                      for="customUnit"
                      lg={2} sm={4}
                      className='materialFormLabel'
                    >
                      <div className='d-flex flex-column justify-content-start'>
                        Custom Material Unit
                        <br></br>
                        <i className='materialFormSmallText'>
                          <sm>  Please note that , you can either select a unit from the list or enter a cutom unit of your choice </sm>
                        </i>
                      </div>
                    </Label>
                    <Col lg={4} sm={8} className='materialFormValue'>
                      <Input
                        id="customUnit"
                        name="customUnit"
                        type="text"
                        placeholder='Material Unit'
                        value={material.customUnit}
                        onChange={(e) => changeHandler(e)}
                      />
                    </Col>
                  </FormGroup>


                  <FormGroup row className='align-items-center justify-content-start'>
                    <Label
                      for="description"
                      lg={2} sm={4}
                      className='materialFormLabel'
                    >
                      Material Description
                    </Label>
                    <Col lg={4} sm={8} className='materialFormValue'>
                      <Input
                        id="description"
                        name="description"
                        type="text"
                        placeholder='Material description'
                        value={material.description}
                        onChange={(e) => changeHandler(e)}
                      />
                    </Col>
                  </FormGroup>


                  <FormGroup row className='d-flex justify-content-right'>
                    <Button className='materialButtonBg' >
                      Add Material
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <hr></hr>
            <MaterialTypesList />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AddMaterial
