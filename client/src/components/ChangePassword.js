import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useDispatch , useSelector} from 'react-redux';
import { updatePasswordAction } from "../store/asyncMethod/ProfileMethods";

const ChangePassword = () => {
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const dispatch = useDispatch()
  const updatePassword = (e) =>{
    e.preventDefault();
    dispatch(updatePasswordAction(state))
  }
  return (
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
                  onChange={(e) =>{
                    setState({...state, newPassword:e.target.value})
                  }}
                  value={state.newPassword}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
