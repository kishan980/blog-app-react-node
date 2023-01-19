import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import  {PostReducer,fetchPost,getByIdPost,UpdatePost,UpdateImage}  from './reducers/PostReducer';
import { updateNameProfile } from './reducers/ProfileReducer';
const rootReducers = combineReducers({
  AuthReducer,
  PostReducer,
  fetchPost,
  getByIdPost,
  UpdatePost,
  UpdateImage,
  updateNameProfile
});
const middleWares = [thunkMiddleware];
const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleWares))
);
export default Store;


