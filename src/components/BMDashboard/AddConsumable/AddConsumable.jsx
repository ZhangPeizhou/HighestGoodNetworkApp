import { Col, Container, Form, FormGroup, Input, Label, Button, CardBody, Card } from 'reactstrap';
import './AddConsumable.css';
import { toast } from 'react-toastify';

function AddConsumable() {
  const changeHandler = () => {
    // console.log('change handler');
  };

  const submitHandler = () => {
    toast.success('submit handler');
  };

  return (
    <div>
      <Container fluid className="materialContainer">
        <div className="materialPage">
          <div className="material">
            <div className="materialTitle">ADD Consumable FORM</div>
            <Card>
              <CardBody>
                <Form id="AddMaterialForm">
                  <FormGroup row className="align-items-center justify-content-start">
                    <Label for="" lg={2} sm={4} className="materialFormLabel">
                      Item Type
                    </Label>
                    <Col lg={4} sm={8} className="materialFormValue">
                      <Input
                        id=""
                        name=""
                        type="text"
                        placeholder="Consumable Name"
                        value="Consumable"
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="align-items-center justify-content-start">
                    <Label for="name" lg={2} sm={4} className="materialFormLabel">
                      Consumable Name
                    </Label>
                    <Col lg={4} sm={8} className="materialFormValue">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        onChange={e => changeHandler(e)}
                        placeholder="Consumable Name"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="align-items-center justify-content-start">
                    <Label for="description" lg={2} sm={4} className="materialFormLabel">
                      Consumable Description
                    </Label>
                    <Col lg={4} sm={8} className="materialFormValue">
                      <Input
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Consumable description"
                        onChange={e => changeHandler(e)}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row className="d-flex justify-content-right">
                    <Button onClick={() => submitHandler()} className="materialButtonBg">
                      Add Consumable
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <hr />
          </div>
        </div>
      </Container>
    </div>
  );
}
export default AddConsumable;
