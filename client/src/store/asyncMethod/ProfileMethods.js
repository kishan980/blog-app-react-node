import axios from "axios";
import { CLOSE_LOADER } from "../types/PostTypes";
import { SET_LOADER, SET_TOKEN } from "./../types/UserTypes";
import {
  REDIRECT_TRUE,
  SET_PROFILE_ERROR,
  RESET_PROFILE_ERROR,
  SET_MESSAGE,
} from "./../types/PostTypes";


export const updateNameAction = (user) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post("/updateName", user, config);
      dispatch({ type: CLOSE_LOADER });
      localStorage.setItem("myToken", data.token)
      dispatch({type: SET_TOKEN, payload:data.token})
      dispatch({type: SET_MESSAGE, payload:data.msg})
      dispatch({ type: REDIRECT_TRUE });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_PROFILE_ERROR,
        payload: error.response.data.errors,
      });
    }
  };
};


export const updatePasswordAction = (userData) =>{
  return async (dispatch, getState) =>{
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({type: SET_LOADER})
    try{
        const {data} =await axios.post("");
        
    }catch(error){
      dispatch({type:CLOSE_LOADER})
    }
  }
}