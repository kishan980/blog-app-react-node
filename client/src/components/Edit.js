import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { getById, updateAction } from "../store/asyncMethod/PostMethods";
import { POST_RESET, RESET_UPDATE_ERRORS } from "./../store/types/PostTypes";
import toast, { Toaster } from "react-hot-toast";
import Loader from './Loader';
const Edit = () => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { loading, redirect } = useSelector((state) => state.PostReducer);
  const { post, postStatus } = useSelector((state) => state.getByIdPost);
  const { editErrors } = useSelector((state) => state.UpdatePost);
  useEffect(() => {
    if (postStatus) {
      setState({
        title: post.title,
        description: post.description,
      });
      setValue(post.body);
      dispatch({ type: POST_RESET });
    } else {
      dispatch(getById(id));
    }
  }, [post]);

  const updatePost = (e) => {
    e.preventDefault();
    dispatch(
      updateAction({
        title: state.title,
        body: value,
        description: state.description,
        id: post._id,
      })
    );
  };

  useEffect(() => {
    if (editErrors.length !== 0) {
      editErrors.map((error) => {
        toast.error(error.msg);
        dispatch({type:RESET_UPDATE_ERRORS})
      });
    }
  }, [editErrors]);

  useEffect(() => {
    if (redirect) {
      push("/dashboard");
    }
  }, [redirect]);
  return !loading ? ( <div className="mt-100">
        <Helmet>
          <title>Edit Post</title>
          <meta name="description" content="updated post" />
        </Helmet>
  
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <h3 className="card__h3">Edit post</h3>
                <Toaster
                  position="top-right"
                  reverseOrder={true}
                  toastOptions={{ style: { fontSize: "15px" } }}
                />
                <form onSubmit={updatePost}>
                  <div className="group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="group__control"
                      placeholder="Enter the post title"
                      onChange={(e) => {
                        setState({ ...state, title: e.target.value });
                      }}
                      value={state.title}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="body">Post body</label>
                    <ReactQuill
                      id="body"
                      theme="snow"
                      value={value}
                      onChange={setValue}
                      placeholder="post body"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="description">meta description</label>
                    <textarea
                      name="description"
                      id="description"
                      cols="30"
                      rows="10"
                      placeholder="meta description..."
                      className="group__control"
                      maxLength="150"
                      defaultValue={state.description}
                      onChange={(e) =>
                        setState({ ...state, description: e.target.value })
                      }
                      onKeyUp={(e) => {
                        setState({ ...state, description: e.target.value });
                      }}
                    ></textarea>
                    <p className="length">
                      {state.description ? state.description.length : 0}
                    </p>
                  </div>
                  <div className="group">
                    <input
                      type="submit"
                      value="Edit"
                      className="btn btn-default btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>):  (
        <Loader/>)
  
  
};

export default Edit;
