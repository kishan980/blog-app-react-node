import axios from "axios";
import {
  CREATE_ERRORS,
  SET_LOADER,
  CLOSE_LOADER,
  REDIRECT_TRUE,
  SET_MESSAGE,
  REMOVE_ERRORS
} from "../types/PostTypes";
// const token = localStorage.getItem("myToken");

export const createAction = (postData) => {
  
  return async (dispatch, getState) => {
    const { AuthReducer:{token}} = getState();
    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { msg },
      } = await axios.post("create_post", postData, config);
      dispatch({ type: SET_MESSAGE, payload: msg });
      dispatch({ type: CLOSE_LOADER });
      dispatch({type:REMOVE_ERRORS})
      dispatch({ type: REDIRECT_TRUE });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      const { errors } = error.response.data;
      dispatch({ type: CREATE_ERRORS, payload: errors });
    }
  };
};
