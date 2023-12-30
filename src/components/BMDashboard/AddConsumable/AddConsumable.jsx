import './AddConsumable.css';
import { useState, useRef } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import './AddConsumable.css';
import DatePicker from 'react-datepicker';
import dateFnsFormat from 'date-fns/format';
import { FaCalendarAlt } from 'react-icons/fa';
import Noimg from '../Lesson/images/Noimg3.jpg';

const style = {
  backgroundImage: `url(${Noimg})`,
};
function AddConsumable() {
  const FORMAT = 'MM/dd/yy';
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  // TODO fix handleDrop
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation(); // Prevent the default behavior
  //   console.log("handledrop")
  //   const file = e.target.files[0]; // Get the selected file
  //   setSelectedFile(file);
  // };

  // const handleDragOver = e => {
  //   e.preventDefault();
  //   // console.log("hi")
  // };
  const handleFileSelection = e => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedFile(file); // Update the state with the selected file
  };

  const handleClick = () => {
    // console.log(selectedFile,"hi click")
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleKeyPress = () => {
    // console.log("hi Keypress")
  };

  // const handleMouseDown = () => {
  //   console.log("hi mousedown")
  // };

  // const handleTouchStart = () => {
  //   console.log("hi touchstart")
  // };
  const datepickerRef = useRef(null);
  const openDatePicker = () => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(true);
    }
  };
  return (
    <div className="ConsumableMasterContainer">
      <div className="ConsumableFormContainer">
        <Form>
          <Form.Label className="ConsumableLabel">Add Consumable</Form.Label>
          <div className="ConsumableFormSelectContainer">
            <div className="ConsumableSingleFormSelect">
              <Form.Group controlId="Form.ControlSelect1">
                <Form.Label>Project</Form.Label>
                <FormControl as="select" aria-label="Default select example">
                  <option>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </FormControl>
              </Form.Group>
            </div>
            <div className="ConsumableSingleFormSelect">
              <Form.Group controlId="Form.ControlSelect2">
                {/* By default the lesson can be read by anyone. The author can change the permission to only public to certain roles. */}
                <Form.Label>Consumable Name</Form.Label>
                <FormControl as="select" aria-label="Default select example">
                  <option>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </FormControl>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                {/* Can have multiple tags. Needs to add tag for belonging project name automatically. */}
                <Form.Label>Invoice Number or ID</Form.Label>
                <Form.Control type="text" placeholder="Invoice No or ID for consumable" />
              </Form.Group>
            </div>
            <div className="ConsumablePriceDiv">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Unit Price (exct. taxes & shipping)</Form.Label>
                <Form.Control type="text" placeholder="Invoice No or ID for consumable" />
              </Form.Group>
              <Form.Group>
                {/* By default the lesson can be read by anyone. The author can change the permission to only public to certain roles. */}
                <Form.Label>Currency</Form.Label>
                <FormControl as="select" aria-label="Default select example">
                  <option>USD</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </FormControl>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                {/* Can have multiple tags. Needs to add tag for belonging project name automatically. */}
                <Form.Label>Invoice Number or ID</Form.Label>
                <Form.Control type="text" placeholder="Invoice No or ID for consumable" />
              </Form.Group>
            </div>
            <div className="ConsumableCurrencySelect">
              <Form.Group>
                {/* By default the lesson can be read by anyone. The author can change the permission to only public to certain roles. */}
                <Form.Label>Qty Unit of Measurement</Form.Label>
                <FormControl as="select" aria-label="Default select example">
                  <option>All</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </FormControl>
              </Form.Group>
              <Form.Label>Purchased Date</Form.Label>
              <div className="date-picker-wrapper">
                <DatePicker
                  ref={datepickerRef}
                  selected={selectedDate}
                  // eslint-disable-next-line
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText={`${dateFnsFormat(new Date(), FORMAT)}`}
                  dateFormat="MM/dd/yy"
                />
                <FaCalendarAlt className="calendar-icon" onClick={openDatePicker} />
              </div>
            </div>
          </div>
          <div className="ConsumableDragAndDropFormGroup">
            <Form.Group controlId="exampleForm.ControlFile1">
              <Form.Label>Upload Appendix</Form.Label>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileSelection}
              />
              <div
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyPress={handleKeyPress}
                // onMouseDown={handleMouseDown}
                // onTouchStart={handleTouchStart}
                // onDrop={handleDrop}
                // onDragOver={handleDragOver}
                className="ConsumabledragAndDropStyle"
              >
                {selectedFile ? (
                  <p>Selected File: {selectedFile.name}</p>
                ) : (
                  <div className="ConsumableTextAndImageDiv">
                    <div className="ConsumableImageDiv" style={style} />

                    <p className="ConsumableDragandDropText">Drag and drop a file here</p>
                  </div>
                )}
              </div>
            </Form.Group>
          </div>
          <div className="ConsumableButtonDiv">
            <Button className="ConsumableFormButtonCancel" type="cancel">
              Cancel
            </Button>
            <Button className="ConsumableFormButtonSubmit" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default AddConsumable;
