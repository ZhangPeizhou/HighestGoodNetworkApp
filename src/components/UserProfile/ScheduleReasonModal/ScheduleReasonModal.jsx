import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container } from 'reactstrap';
import { useDispatch,useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import {useState } from 'react';
import { boxStyle } from 'styles';
import './ScheduleReasonModal.css';
import ScheduleReasonModalCard from "./ScheduleReasonModalCard"
import {
  addTimeOffRequestThunk,
  deleteTimeOffRequestThunk,
} from '../../../actions/timeOffRequestAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleReasonModal = ({ handleClose , userId}) => {
  const dispatch = useDispatch()
  const allRequests = useSelector(state => state.timeOffRequests.requests);
  const nextSundayStr = moment()
    .tz('America/Los_Angeles')
    .startOf('isoWeek')
    .add(7, 'days')
    .format('YYYY-MM-DD');
  const nextSundayDate = new Date(nextSundayStr);

  const initialRequestData = {
    dateOfLeave: nextSundayDate,
    reasonForLeave: '',
  };

  const initialRequestDataErrors = {
    dateOfLeaveError: '',
    reasonForLeaveError: '',
  };

  const [requestData, setRequestData] = useState(initialRequestData);
  const [requestDataErrors, setRequestDataErrors] = useState(initialRequestDataErrors);

  const filterSunday = date => {
    const losAngelesDate = moment(date).tz('America/Los_Angeles');
    return losAngelesDate.day() === 6; // Sunday
  };

  const handleAddRequestDataChange = e => {
    e.preventDefault();
    const id = e.target.name;
    const value = e.target.value;
    setRequestData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateDateOfLeave = data => {
    if (!data.dateOfLeave) {
      setRequestDataErrors(prev => ({
        ...prev,
        dateOfLeaveError: 'Date of leave can not be empty',
      }));
      return false;
    }
    return true;
  };

  const validateReasonForLeave = data => {
    if (!data.reasonForLeave) {
      setRequestDataErrors(prev => ({
        ...prev,
        reasonForLeaveError: 'Reason for leave can not be empty',
      }));
      return false;
    }
    const words = data.reasonForLeave.split(/\s+/)
    if (words.length < 10) {
      setRequestDataErrors(prev => ({
        ...prev,
        reasonForLeaveError: 'Reason for leave can not be less than 10 words',
      }));
      return false;
    }

    return true;
  };

  const validateDateIsNotBeforeToday = data => {
    const isBeforeToday = moment(data.dateOfLeave).isBefore(moment(), 'day');
    if (isBeforeToday) {
      setRequestDataErrors(prev => ({
        ...prev,
        dateOfLeaveError: 'Date of leave can not be before today',
      }));
      return false;
    }

    return true;
  };

  const handleDeleteRequest = id => {
    dispatch(deleteTimeOffRequestThunk(id));
  };

  

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateDateOfLeave(requestData)) return;
    if (!validateDateIsNotBeforeToday(requestData)) return;
    if (!validateReasonForLeave(requestData)) return;
    
    setRequestDataErrors(initialRequestDataErrors);
    const data = {
      requestFor: userId,
      reason: requestData.reasonForLeave,
      startingDate: moment(requestData.dateOfLeave)
        .tz('America/Los_Angeles')
        .format('YYYY-MM-DD'),
      duration: 1,
    };
    dispatch(addTimeOffRequestThunk(data));
  };
  

  return (
    <>
      <Modal.Header closeButton={true}>
        <Modal.Title className="centered-container">
          <div className="centered-text">Choose to Use a Blue Square</div>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              {/* Schedule a reason to be used on this weekend's blue square for {user.firstName} */}
              Need to take a week off for an emergency or vacation? That's no problem. The system
              will still issue you a blue square but scheduling here will note this reason on it so
              it's clear you chose to use one (vs receiving one for missing something) and let us
              know in advance. Blue squares are meant for situations like this and we allow 5 a
              year.
            </Form.Label>
            <Form.Label>
              <p>
                To schedule your time off, you need to CHOOSE THE SUNDAY OF THE WEEK YOU’LL RETURN.
                This is the date needed so your reason ends up on the blue square that will be
                auto-issued AT THE END OF THE WEEK YOU'LL BE GONE.
              </p>
            </Form.Label>
            <Form.Label>Choose the Sunday of the week you'll leave:</Form.Label>
            <DatePicker
              selected={requestData.dateOfLeave}
              onChange={date => {
                setRequestData(prev => ({
                  ...prev,
                  ['dateOfLeave']: date,
                }));
              }}
              filterDate={filterSunday}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select a Sunday"
              id="dateOfLeave"
              className="form-control"
              wrapperClassName="w-100"
            />
            <Form.Text className="text-danger pl-1">{requestDataErrors.dateOfLeaveError}</Form.Text>
            <Form.Label className="mt-1">
              What is your reason for requesting this time off?
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="reasonForLeave"
              className="w-100"
              placeholder="Please be detailed in describing your reason and, if it is different than your scheduled Sunday, include the expected date you’ll return to work."
              value={requestData.reasonForLeave}
              onChange={e => handleAddRequestDataChange(e)}
            />
            <Form.Text className="text-danger pl-1">
              {requestDataErrors.reasonForLeaveError}
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" title="Function coming" onClick={handleClose} style={boxStyle}>
            FAQ
          </Button>
          <Button variant="secondary" onClick={handleClose} style={boxStyle}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            title="To Save - add a new reason or edit an existing reason. 
             Clicking 'Save' will generate an email to you and One Community as a record of this request."
            style={boxStyle}
          >
            Save
          </Button>
        </Modal.Footer>
        <Modal.Footer>
          <Container style={{ overflow: 'scroll', overflowX: 'hidden', maxHeight: '160px' }}>
            {allRequests[userId]?.length > 0 ? (allRequests[userId].map( request =>
              (<ScheduleReasonModalCard key={request._id} request={request} handleDeleteRequest={handleDeleteRequest}/>)
            )): null}
          </Container>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default React.memo(ScheduleReasonModal);
