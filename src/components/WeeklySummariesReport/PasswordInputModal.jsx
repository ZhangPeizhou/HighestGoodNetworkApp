import { useState, useReducer } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Alert,
  Input,
  FormGroup,
} from 'reactstrap';
import { boxStyle } from 'styles';
import axios from 'axios';
import { ENDPOINTS } from '../../utils/URL';
import {
  authorizeWeeklySummaries,
  authorizeWeeklySummariesReportError,
} from '../../actions/weeklySummariesReportRecepients';
import { weeklySummaryRecipientsReducer } from '../../reducers/weeklySummaryRecipientsReducer';

export default function PasswordInputModal({
  onClose,
  open,
  checkForValidPwd,
  isValidPwd,
  setSummaryRecepientsPopup,
}) {
  const [state, dispatch] = useReducer(weeklySummaryRecipientsReducer, {
    passwordMatch: '',
    passwordMatchErr: '',
  });
  const [passwordField, setPasswordField] = useState('');

  const onChangeFunc = event => {
    setPasswordField(event.target.value);
  };

  const onSubmit = () => {
    setPasswordField('');
    authorizeWeeklySummariesButton(passwordField);
  };

  const authorizeWeeklySummariesButton = async () => {
    const url = ENDPOINTS.AUTHORIZE_WEEKLY_SUMMARY_REPORTS();
    try {
      await axios.post(url, { currentPassword: passwordField }).then(response => {
        console.log(response);
        if (response.status != 200) {
          dispatch(authorizeWeeklySummariesReportError('Incorrect Password! Unauthorised User!'));
          checkForValidPwd(false);
          setSummaryRecepientsPopup(false);
        } else {
          dispatch(authorizeWeeklySummaries(response.data.message));
          checkForValidPwd(true);
          setSummaryRecepientsPopup(true);
        }
      });
    } catch (error) {
      console.log('error:', error);
      checkForValidPwd(false);
      dispatch(authorizeWeeklySummariesReportError('Incorrect Password! Unauthorised User!'));
    }
  };

  return (
    <Container fluid>
      <Modal isOpen={open} toggle={onClose} autoFocus={false} size="lg">
        <ModalHeader toggle={onClose}>Password to Authorise User</ModalHeader>
        <ModalBody style={{ textAlign: 'center' }}>
          {!isValidPwd && state.passwordMatchErr && (
            <Alert color="danger">{state.passwordMatchErr}</Alert>
          )}
          {isValidPwd && state.passwordMatch != '' && (
            <Alert color="success">{state.passwordMatch} </Alert>
          )}
          <FormGroup>
            <Input
              autoFocus
              type="password"
              name="passwordField"
              id="passwordField"
              value={passwordField}
              onChange={onChangeFunc}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onSubmit} style={boxStyle}>
            Authorize
          </Button>
          <Button color="secondary" onClick={onClose} style={boxStyle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}