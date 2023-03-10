import {
  SET_LOADER,
  CLOSE_LOADER,
  SET_TOKEN,
  REGISTER_ERRORS,
  LOGOUT,
  LOGIN_ERRORS,
  REDIRECT_TRUE,
  REDIRECT_FALSE,
} from "../types/UserTypes";

import jwt_decode from "jwt-decode";
const initState = {
  loading: false,
  registerError: [],
  loginErrors: [],
  token: "",
  user: "",
};

const verifyToken = (token) => {
  const decodeToken = jwt_decode(token);
  const expiresIn = new Date(decodeToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("myToken");
    return null;
  } else {
    return decodeToken;
  }
};

const token = localStorage.getItem("myToken");
if (token) {
  const decode = verifyToken(token);
  if(decode){

    initState.token = token;
    const { user } = decode;
    initState.user = user;
  }
}

const AuthReducer = (state = initState, action) => {
  if (action.type === SET_LOADER) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === CLOSE_LOADER) {
    return {
      ...state,
      loading: false,
    };
  } else if (action.type === REGISTER_ERRORS) {
    return {
      ...state,
      registerError: action.payload,
    };
  } else if (action.type === SET_TOKEN) {
    const decoded = verifyToken(action.payload);
    const { user } = decoded;
    return {
      ...state,
      token: action.payload,
      user: user,
      registerError: [],
      loginErrors: [],
    };
  } else if (action.type === LOGOUT) {
    return {
      ...state,
      token: "",
      user: "",
    };
  } else if (action.type === LOGIN_ERRORS) {
    return {
      ...state,
      loginErrors: action.payload,
    };
  } else {
    return state;
  }
};

export default AuthReducer;
