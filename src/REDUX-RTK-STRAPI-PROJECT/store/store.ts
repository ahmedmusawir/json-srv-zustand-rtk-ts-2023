import { configureStore } from "@reduxjs/toolkit";
import { dummyJsonApi } from "../services/dummyJsonApi";
import { contactRTKApi } from "../services/contactRTKApi";

export default configureStore({
  reducer: {
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    [contactRTKApi.reducerPath]: contactRTKApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      dummyJsonApi.middleware,
      contactRTKApi.middleware,
    ]),
});
