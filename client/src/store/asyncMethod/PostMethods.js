import axios from "axios";
import {
  CREATE_ERRORS,
  SET_LOADER,
  CLOSE_LOADER,
  REDIRECT_TRUE,
  SET_MESSAGE,
  REMOVE_ERRORS,
  SET_POSTS,
  SET_POST,
  POST_REQUEST,
  SET_UPDATE_ERRORS,
  UPDATE_IMAGE_ERROR,
  SET_DETAILS
} from "../types/PostTypes";
// const token = localStorage.getItem("myToken");

export const createAction = (postData) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
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
      dispatch({ type: REMOVE_ERRORS });
      dispatch({ type: REDIRECT_TRUE });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      const { errors } = error.response.data;
      dispatch({ type: CREATE_ERRORS, payload: errors });
    }
  };
};

export const fetchPost = (id, page) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { response, count, perPage },
      } = await axios.get(`/posts/${id}/${page}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_POSTS, payload: { response, count, perPage } });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
    }
  };
};

export const getById = (id) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { post },
      } = await axios.get(`/post/${id}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_POST, payload: post });
      dispatch({ type: POST_REQUEST });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error.message);
    }
  };
};

export const updateAction = (editData) => {
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
      const { data } = await axios.post("/update", editData, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REDIRECT_TRUE });
      dispatch({ type: SET_MESSAGE, payload: data.msg });
    } catch (error) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_UPDATE_ERRORS, payload: errors });
      console.log(error.response);
    }
  };
};

export const updateImageAction = (updateData) => {
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
      const {
        data: { msg },
      } = await axios.post("/updateImage", updateData, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REDIRECT_TRUE });
      dispatch({ type: SET_MESSAGE, payload: msg });
    } catch (error) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: UPDATE_IMAGE_ERROR, payload: errors });
    }
  };
};

export const HomePosts = (page) => {
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
      const {
        data: { response, count, perPage },
      } = await axios.get(`/home/${page}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_POSTS, payload: { response, count, perPage } });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error);
    }
  };
};


export const postDetails = (id) => {
  console.log("🚀 ~ file: PostMethods.js:181 ~ postDetails ~ id", id)

  return async(dispatch) =>{
    dispatch({type:SET_LOADER})
    try{
      const {data:{post}} = await axios.get(`/details/${id}`);
      dispatch({type: CLOSE_LOADER})
      dispatch({type:SET_DETAILS, payload:post})
    }catch(error){
      dispatch({type: CLOSE_LOADER})
      console.log(error)
    }
  }
} 