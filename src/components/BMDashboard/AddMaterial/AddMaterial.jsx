import React from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Button, CardBody, Card, Table } from 'reactstrap'
import './AddMaterial.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllBuildingInventoryMaterialTypes, postBuildingInventoryType, resetPostBuildingInventoryTypeResult } from 'actions/bmdashboard/bmInventoryTypeActions';
import { useState } from 'react';
import MaterialTypesList from './MaterialTypesList';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { similarity } from './SimilarityCheck';

function AddMaterial() {
  const dispatch = useDispatch();
  const buildingInventoryTypes = useSelector(state => state.buildingInventoryTypes.fetchedResult)
  const postBuildingInventoryResult = useSelector(state => state.buildingInventoryTypes.postedResult)
  const [material, setMaterial] = useState({
    name: '',
    unit: '',
    customUnit: '',
    customUnitCheck: false,
    description: ''

  })
  const [validations, setValidations] = useState({
    name: '',
    unit: '',
    customUnit: '',
    description: '',
    commonUnit: '',
    customUnitCheck: '',
    total: true
  })
  const [similarityData, setSimilarityData] = useState([]);

  useEffect(() => {
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
        material.customUnitCheck = false;
      }
    }
    if (field == 'customUnitCheck') {
      material[field] = e.target.checked;
    }
    setMaterial({ ...material });
    if (field != null)
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
  const schema = Joi.object(obj).options({ abortEarly: false, allowUnknown: true });

  const submitHandler = () => {
    let error = validationHandler(null, null, true);
    console.log(material)

    // if (!error) {
    //   dispatch(postBuildingInventoryType(material));
    // }
  }
  const validationHandler = (field, value, complete) => {
    let validate;
    let propertySchema;
    let validationErrorFlag = false;
    if (complete) {
      validate = schema.validate(material);
    }
    else if (field != 'customUnitCheck') {
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

    if (validate?.error) {
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

    if (material.customUnit != '') {
      let _similarityData = [];
      for (let i = 0; i < buildingInventoryTypes.result.length; i++) {
        let similarityPercent = similarity(buildingInventoryTypes.result[i].unit, material.customUnit);
        // console.log(buildingInventoryTypes.result[i].unit, similarityPercent)
        if (similarityPercent > 0.65) {
          let obj = {
            'unitFromStore': buildingInventoryTypes.result[i].unit,
            'similarityPercent': similarityPercent
          }
          _similarityData.push(obj);
        }
      }
      setSimilarityData([..._similarityData])

    } else {
      let _similarityData = [];
      setSimilarityData([..._similarityData])
    }
    if (similarityData.length != 0 && !material.customUnitCheck) {
      validationErrorFlag = validationErrorFlag || true;
      validations.customUnitCheck = 'Please confirm or select a unit from available ones';
    }
    else {
      validationErrorFlag = validationErrorFlag || false;
      validations.customUnitCheck = '';
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
                      Measurement
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
                        New  Measurement
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

                  {
                    similarityData.length != 0 &&
                    <FormGroup row className='align-items-center justify-content-start'>
                      <Label
                        for="similarityCheck"
                        lg={12} sm={12}
                        className='materialFormLabel'
                      >

                        <div className='materialFormText'>
                          <div>
                            <i>
                              Found some similar units from store.

                            </i>
                            <br />

                            <FormGroup check>
                              <Input
                                id="customUnitCheck"
                                name="customUnitCheck"
                                type="checkbox"
                                value={material.customUnitCheck}
                                onChange={(e) => changeHandler(e)}
                              />
                              <Label
                                check
                                for="customUnitCheck"
                              >
                                Please confirm if the newly entered unit is different from the available ones.
                              </Label>
                              {
                                validations.customUnitCheck != ""
                                &&
                                <Label
                                  for="materialNameErr"
                                  sm={12}
                                  className='materialFormError'
                                >
                                  {validations.customUnitCheck}
                                </Label>
                              }
                            </FormGroup>

                          </div>
                          <Table bordered striped className='materialMargin'>
                            <tbody>
                              <tr>
                                <th>Unit</th>
                                <th>Similarity Percentage to {material.customUnit}</th>
                              </tr>
                              {
                                similarityData.map((sim) =>
                                  <tr key={sim.unitFromStore}>
                                    <td > {sim.unitFromStore} </td>
                                    <td > {sim.similarityPercent} </td>
                                  </tr>
                                )
                              }
                            </tbody>
                          </Table>
                        </div>

                      </Label>

                    </FormGroup>
                  }


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
