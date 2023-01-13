import BgImage from "./BgImage";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {useNavigate}  from "react-router-dom";

import { postRegister } from "./../../store/asyncMethod/AuthMethod";

const Register = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loading, registerError, user } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const userRegister = async (e) => {
    e.preventDefault();
    dispatch(postRegister(state));
  };
  useEffect(() => {
     if (registerError.length > 0 ) {
        registerError.map((error) => toast.error(error.msg)) 
     }
    //  if(user){
    //   props.history.push("/dashboard")
    //  }
  }, [registerError, user]);
  
  return (
    <>
      (<Helmet>
        <title data-rh="true">Register</title>
        <meta name="description" content="user register form" />
      </Helmet>)
      <div className="row mt-80">
        <div className="col-8">
          <BgImage />
          <Toaster position="top-right" reverseOrder={true}  toastOptions={{ style:{fontSize:'15px'}}}/>
        </div>

        <div className="col-4">
          <div className="account">
            <div className="account_section">
              <form onSubmit={userRegister}>
                <div className="group">
                  <h3 className="form-heading">Register</h3>
                </div>
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    className="group__control"
                    Placeholder="Enter the name"
                    value={state.name}
                    onChange={handleInputs}
                  />
                  
                  </div>
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    className="group__control"
                    Placeholder="Enter the email"
                    value={state.email}
                    onChange={handleInputs}
                  />
                </div>
                <div className="group">
                  <input
                    type="password"
                    name="password"
                    className="group__control" 
                    Placeholder="Enter the password"
                    value={state.password}
                    onChange={handleInputs}
                  />
                </div>
                <div className="group">
                  <input
                    type="submit"
                    name=""
                    id=""
                    className="btn btn-default btn-block"
                    value={loading ? "...." : "Register"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
