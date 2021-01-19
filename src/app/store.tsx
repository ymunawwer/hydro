import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { createLogger } from "redux-logger";
import "babel-polyfill";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV === "development",
});

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;
