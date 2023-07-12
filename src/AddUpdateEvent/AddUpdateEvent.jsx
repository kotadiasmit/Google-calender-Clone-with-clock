import { useState } from "react";
import { useDispatch } from "react-redux";
import { TimePicker } from "material-ui";
import { Button, Modal } from "react-bootstrap";
import { addMyEvent, deleteMyEvent, updateMyEvent } from "../Store/reducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddUpdateEvent.css";

const AddUpdateEvent = ({ addAndUpdateEvent, closeModel, isAddEvent }) => {
  const { title, desc, id, start, end } = addAndUpdateEvent;
  const initialState = {
    eventTitle: title || "",
    description: desc || "",
    startTime: start || null,
    endTime: end || null,
  };
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [eventData, setEventData] = useState(initialState);
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

  const onInputChange = (event) => {
    const { id, value } = event.target;
    setEventData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onStartTimeChange = (_, date) => {
    setEventData((prevData) => ({
      ...prevData,
      startTime: date,
    }));
  };

  const onEndTimeChange = (_, date) => {
    setEventData((prevData) => ({
      ...prevData,
      endTime: date,
    }));
  };

  const modalCloseOnAdd = (event) => {
    event.preventDefault();
    const { eventTitle, startTime, endTime, description } = eventData;
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
      if (endTime?.getTime() - startTime?.getTime() <= 0) {
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
              value={eventData.eventTitle}
              onChange={onInputChange}
              autoFocus
            />
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              className="textarea"
              maxLength="200"
              placeholder="Description"
              value={eventData.description}
              onChange={onInputChange}
              id="description"
            ></textarea>
            <div className="time-container">
              <TimePicker
                className="time-picker"
                format="24hr"
                floatingLabelText="Start Time"
                minutesStep={5}
                value={start}
                id="startTimePicker"
                onChange={onStartTimeChange}
              />
              <TimePicker
                className="time-picker"
                format="24hr"
                floatingLabelText="End Time"
                minutesStep={5}
                value={end}
                id="endTimePicker"
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
