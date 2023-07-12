import "bootstrap/dist/css/bootstrap.min.css";
import { TimePicker } from "material-ui";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMyEvent, deleteMyEvent, updateMyEvent } from "../Store/reducer";
import "./AddUpdateEvent.css";

const AddUpdateEvent = ({ addAndUpdateEvent, closeModel, isAddEvent }) => {
  const { title, desc, id, start, end } = addAndUpdateEvent;

  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  const [eventTitle, setEventTitle] = useState(title);
  const [description, setDescription] = useState(desc);
  const [startTime, setStartTime] = useState(start);
  const [endTime, setEndTime] = useState(end);
  const [errorMsg, setErrorMsg] = useState("");

  const modalClose = () => {
    closeModel();
    setShow(false);
  };

  const showErrorMsg = (trimmedEventTitle) => {
    if (trimmedEventTitle === "") {
      setErrorMsg("please enter valid title");
    }
  };

  const titleInputChanged = (event) => {
    const { value } = event.target;
    setEventTitle(value);
    setErrorMsg("");
  };
  const descriptionChanged = (event) => {
    const { value } = event.target;
    setDescription(value);
  };
  const onStartTimeChange = (date) => {
    setStartTime(date);
  };
  const onEndTimeChange = (date) => {
    setEndTime(date);
  };

  const modalCloseOnAdd = (event) => {
    event.preventDefault();
    const trimmedEventTitle = eventTitle.trim();
    const trimmedDescription = description.trim();

    if (trimmedEventTitle) {
      let AddOrUpdateEventDetails = {
        id: id,
        title: trimmedEventTitle,
        desc: trimmedDescription,
        start: startTime,
        end: endTime,
      };
      if (endTime.getTime() - startTime.getTime() <= 0) {
        alert("Please set valid End Time");
        return;
      }
      isAddEvent
        ? dispatch(addMyEvent(AddOrUpdateEventDetails))
        : dispatch(updateMyEvent(AddOrUpdateEventDetails));
      setShow(false);
      closeModel();
    } else {
      showErrorMsg(trimmedEventTitle);
    }
  };

  const deleteEvent = () => {
    const id = addAndUpdateEvent.id;
    closeModel();
    dispatch(deleteMyEvent(id));
  };

  return (
    <>
      <Modal centered show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isAddEvent ? "Add Event" : "Update Event"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="form-container" onSubmit={modalCloseOnAdd}>
            <label className="label" htmlFor="eventTitle">
              Event Title
            </label>
            <input
              className="input"
              type="text"
              id="eventTitle"
              placeholder="Event Title"
              maxLength="40"
              value={eventTitle}
              onChange={titleInputChanged}
              autoFocus
            />
            <label className="label" htmlFor="textarea">
              Description
            </label>
            <textarea
              className="textarea"
              maxLength="200"
              placeholder="Description"
              value={description}
              onChange={descriptionChanged}
              id="textarea"
            ></textarea>
            <div className="time-container">
              <TimePicker
                className="time-picker"
                format="24hr"
                floatingLabelText="Start Time"
                minutesStep={5}
                value={start}
                onChange={onStartTimeChange}
              />
              <TimePicker
                format="24hr"
                floatingLabelText="End Time"
                minutesStep={5}
                value={end}
                onChange={onEndTimeChange}
              />
            </div>
            {errorMsg && (
              <p className="error-msg">
                <sup>*</sup>
                {errorMsg}
              </p>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close Event
          </Button>
          {!isAddEvent && (
            <Button variant="danger" onClick={deleteEvent}>
              Delete Event
            </Button>
          )}
          <Button variant="primary" onClick={modalCloseOnAdd}>
            {isAddEvent ? "Add Event" : "Update Event"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddUpdateEvent;
