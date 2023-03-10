import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  CLOSE_LOADER,
  REDIRECT_FALSE,
  REMOVE_MESSAGE,
} from "../store/types/PostTypes";
import { fetchPost } from "../store/asyncMethod/PostMethods";
import { Link, useParams } from "react-router-dom";
import { BsPencil, BsArchive, BsImage } from "react-icons/bs";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import axios from "axios";
import { SET_LOADER } from "./../store/types/UserTypes";
import { SET_MESSAGE } from './../store/types/PostTypes';
import moment  from "moment"
const Dashboard = () => {
  const { redirect, message, loading } = useSelector(
    (state) => state.PostReducer
  );

  const {
    user: { _id },
    token,
  } = useSelector((state) => state.AuthReducer);
  const { page } = useParams();
  const { posts, count, perPage } = useSelector((state) => state.fetchPost);
  const dispatch = useDispatch();

  const deletePost = async (id) => {
    const confirm = window.confirm("Are you really want to delete this post");
    if (confirm) {
      dispatch({ type: SET_LOADER });
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const {
          data: { msg },
        } = await axios.delete(`/deletePost/${id}`, config);
        dispatch(fetchPost(_id, page));
        dispatch({type:SET_MESSAGE,payload:msg})
      } catch (error) {
        dispatch({ type: CLOSE_LOADER });
      }
    }
  };

  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, [message]);

  useEffect(() => {
    dispatch(fetchPost(_id, page));
  }, [page]);

  return (
    <>
      <Helmet>
        <title>User Dashboard</title>
        <meta name="description" content="User Dashboard" />
      </Helmet>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      <div className="container mt-100">
        <div className="row ml-minus-15 mr-minus-15">
          <div className="col-3 p-15">
            <Sidebar />
          </div>
          <div className="col-9 p-15">
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div className="dashboard__posts" key={post._id}>
                    <div className="dashboard__posts__title">
                      <Link to={`/details/${post._id}`}>{post.title}</Link>
                      <span>Published  {moment(post.updatedAt, "YYYYMMDD").fromNow()}</span>
                    </div>
                    <div className="dashboard__posts__links">
                      <Link to={`/updateImage/${post._id}`}>
                        <BsImage className="icon" />
                      </Link>
                      <Link to={`/edit/${post._id}`}>
                        <BsPencil className="icon" />
                      </Link>
                      <Link >
                        <BsArchive
                          onClick={() => deletePost(post._id)}
                          className="icon"
                        />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                "You don't have any post"
              )
            ) : (
              <Loader />
            )}
            <Pagination path="dashboard" count={count} perPage={perPage} page={page} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
