import React from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Button, CardBody, Card } from 'reactstrap'
import './AddMaterial.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllBuildingInventoryMaterialTypes, postBuildingInventoryType, resetPostBuildingInventoryTypeResult } from 'actions/bmdashboard/bmInventoryTypeActions';
import { useState } from 'react';
import MaterialTypesList from './MaterialTypesList';
import Joi from 'joi';
import { toast } from 'react-toastify';

function AddMaterial() {
  const dispatch = useDispatch();
  const buildingInventoryTypes = useSelector(state => state.buildingInventoryTypes.fetchedResult)
  const postBuildingInventoryResult = useSelector(state => state.buildingInventoryTypes.postedResult)
  const [material, setMaterial] = useState({
    name: '',
    unit: '',
    customUnit: '',
    description: ''

  })
  const [validations, setValidations] = useState({
    name: '',
    unit: '',
    customUnit: '',
    description: '',
    commonUnit: '',
    total: true
  })


  useEffect(() => {
    console.log('postBuildingInventoryResult', postBuildingInventoryResult)
    if (postBuildingInventoryResult?.error == true) {
      toast.error(`${postBuildingInventoryResult?.result}`);
      dispatch(fetchAllBuildingInventoryMaterialTypes());
      dispatch(resetPostBuildingInventoryTypeResult());
    }
    else if (postBuildingInventoryResult?.result != null) {
      toast.success(`Created a new Material Type "${postBuildingInventoryResult?.result.name}" successfully`);
      dispatch(fetchAllBuildingInventoryMaterialTypes());
      dispatch(resetPostBuildingInventoryTypeResult());
    }

  }, [postBuildingInventoryResult])

  const changeHandler = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    material[field] = value;
    if (field == 'customUnit') {
      if (value) {
        material.unit = ''
      }
    }
    if (field == 'unit') {
      if (value != '') {
        material.customUnit = ''
      }
    }
    setMaterial({ ...material });
    validationHandler(field, value)
  }
  const obj = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string()
      .min(10)
      .max(150)
      .required(),
    unit: Joi.string().allow('').optional(),
    customUnit: Joi.string().allow('').optional()
  }
  const schema = Joi.object(obj).options({ abortEarly: false });

  const submitHandler = () => {
    let error = validationHandler(null, null, true);
    if (!error) {
      dispatch(postBuildingInventoryType(material));
    }
  }
  const validationHandler = (field, value, complete) => {
    let validate;
    let propertySchema;
    let validationErrorFlag = false;
    if (complete) {
      validate = schema.validate(material);
    }
    else {
      propertySchema = Joi.object({ [field]: obj[field] });
      validate = propertySchema.validate({ [field]: value });
    }

    if (!material.unit && !material.customUnit) {
      if (complete || field == 'unit' || field == 'customUnit') {
        validations.commonUnit = 'At least one of "unit" or "customUnit" must have a valid value';
        validationErrorFlag = true;
      }
    } else if (material.unit && material.customUnit) {
      if (complete || field == 'unit' || field == 'customUnit') {
        validations.commonUnit = 'Only one of the unit should have a value';
        validationErrorFlag = true;
      }
    }
    else {
      validations.commonUnit = '';
    }

    if (validate.error) {
      for (let i = 0; i < validate.error.details.length; i++) {
        let errorObj = validate.error.details[i];
        if (errorObj.context.peersWithLabels) {
          for (let j = 0; j < errorObj.context.peersWithLabels.length; j++) {
            validations[errorObj.context.peersWithLabels[j]] = errorObj.message;
            validationErrorFlag = true;
          }
        }
        else
          validations[errorObj.context.label] = errorObj.message;
        validationErrorFlag = true;
      }
    }
    else {
      if (!complete) {
        validations[field] = '';
      }
    }

    validations.total = validationErrorFlag;
    setValidations({ ...validations });
    return validationErrorFlag;
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

                    {
                      validations.name != ""
                      &&
                      <Label
                        for="materialNameErr"
                        sm={12}
                        className='materialFormError'
                      >
                        {'Material ' + validations.name}
                      </Label>
                    }

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
                        <option value={''} key={'customUnit'}>--Please select unit--</option>
                        {
                          buildingInventoryTypes.result?.map((matType) =>
                            <option key={matType._id} value={matType.unit}>{matType.unit}</option>
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
                          Please note that , you can either select a unit from the list or enter a cutom unit of your choice
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
                    {
                      validations.customUnit != ""
                      &&
                      <Label
                        for="materialNameErr"
                        sm={12}
                        className='materialFormError'
                      >
                        {validations.customUnit}
                      </Label>
                    }
                  </FormGroup>
                  <FormGroup row>
                    {
                      validations.commonUnit != ""
                      &&
                      <Label
                        for="materialNameErr"
                        sm={12}
                        className='materialFormError'
                      >
                        {validations.commonUnit}
                      </Label>
                    }
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
                    {
                      validations.description != ""
                      &&
                      <Label
                        for="materialNameErr"
                        sm={12}
                        className='materialFormError'
                      >
                        {'Material ' + validations.description}
                      </Label>
                    }
                  </FormGroup>


                  <FormGroup row className='d-flex justify-content-right'>
                    <Button disabled={validations.total} onClick={() => submitHandler()} className='materialButtonBg' >
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
