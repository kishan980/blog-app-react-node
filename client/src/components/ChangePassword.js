import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordAction } from "../store/asyncMethod/ProfileMethods";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";
import { RESET_UPDATE_IMAGE_ERRORS } from "../store/types/PostTypes";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const {push} = useHistory()
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    userId: null,
  });
  const dispatch = useDispatch();
  const { loading, redirect } = useSelector((state) => state.PostReducer);
  const { updateErrors } = useSelector((state) => state.updateNameProfile);
  const {
    user: { _id },
  } = useSelector((state) => state.AuthReducer);
  const updatePassword = (e) => {
    e.preventDefault();
    dispatch(
      updatePasswordAction({
        currentPassword: state.currentPassword,
        newPassword: state.newPassword,
        userId: _id,
      })
    );
  };
  useEffect(() => {
    if (updateErrors.length !== 0) {
      updateErrors.map((error) => toast.error(error.msg));
      dispatch({ type: RESET_UPDATE_IMAGE_ERRORS });
    }
  }, [updateErrors]);

  useEffect(() =>{
    if(redirect){
      push("/dashboard")
    }
  })
  return !loading ? (
    <>
      <div className="container mt-100">
        <Helmet>
          <title>update password</title>
          <meta name="description" content="create a new post" />
        </Helmet>

        <div className="row ml-minus-15 mr-minus-15">
          <div className="col-3 p-15">
            <Sidebar />
          </div>
          <div className="col-9 p-15">
            <div className="card">
              <h3 className="card__h3">Update Password</h3>
              <Toaster
                position="top-right"
                reverseOrder={true}
                toastOptions={{ style: { fontSize: "15px" } }}
              />

              <form onSubmit={updatePassword}>
                <div className="group">
                  <input
                    type="password"
                    name=""
                    placeholder="Enter current Password"
                    className="group__control"
                    onChange={(e) => {
                      setState({ ...state, currentPassword: e.target.value });
                    }}
                    value={state.currentPassword}
                  />
                </div>
                <div className="group">
                  <input
                    type="password"
                    name=""
                    placeholder="Enter New Password"
                    className="group__control"
                    onChange={(e) => {
                      setState({ ...state, newPassword: e.target.value });
                    }}
                    value={state.newPassword}
                  />
                </div>
                <div className="group">
                  <input
                    type="submit"
                    value="Change Password"
                    className="btn btn-default btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};
export default ChangePassword;
