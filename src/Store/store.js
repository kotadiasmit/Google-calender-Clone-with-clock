import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./reducer";

const store = configureStore({
  reducer: {
    eventStore: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
