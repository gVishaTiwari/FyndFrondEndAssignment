import movieReducer from "./movie/movieReducer";
import authReducer from './user/authReducer';
import errorReducer from './error/errorReducer';
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["movieReducer"],
};

const rootReducer = combineReducers({
  movieReducer: movieReducer,
  auth:authReducer,
  error:errorReducer,
});

export default persistReducer(persistConfig, rootReducer);
