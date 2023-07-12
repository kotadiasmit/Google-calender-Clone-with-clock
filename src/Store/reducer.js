import { createSlice } from "@reduxjs/toolkit";

const myEventsList = [
  {
    id: 0,
    title: "Day Event",
    allDay: true,
    start: new Date(2023, 6, 11, 5, 0, 0),
    end: new Date(2023, 6, 11, 9, 0, 0),
    desc: "",
  },
  {
    id: 1,
    title: "My Event",
    start: new Date(2023, 6, 7),
    end: new Date(2023, 6, 7),
    desc: "My Desc.",
  },
];

const eventReducer = createSlice({
  name: "events",
  initialState: {
    eventList: myEventsList,
  },
  reducers: {
    addMyEvent(state, action) {
      state.eventList.push(action.payload);
    },
    updateMyEvent(state, action) {
      const { id } = action.payload;
      const index = state.eventList.findIndex(
        (eventDetails) => eventDetails.id === id
      );
      state.eventList.splice(index, 1, action.payload);
    },
    deleteMyEvent(state, action) {
      const eventId = action.payload;
      const index = state.eventList.findIndex(
        (eventDetails) => eventDetails.id === eventId
      );
      state.eventList.splice(index, 1);
    },
  },
});
export const { addMyEvent, updateMyEvent, deleteMyEvent } =
  eventReducer.actions;
export default eventReducer.reducer;
