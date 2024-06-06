import { configureStore } from "@reduxjs/toolkit";
import webinarReducer from "../reducers/webinarReducer";
import webinarSlice from "../reducers/webinarSlice";
import detailReducer from "../reducers/detailReducer";

const store = configureStore({
  reducer: {
    webinar: webinarReducer,
    webinarAdd: webinarSlice,
    detailWebinar: detailReducer,
  },
});

export default store;
