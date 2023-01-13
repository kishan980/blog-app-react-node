import { useState, useEffect } from "react";
import BgImage from "./BgImage";
import { Helmet } from 'react-helmet';
import {useSelector, useDispatch} from "react-redux";
import {postLogin} from "../../store/asyncMethod/AuthMethod";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const {loginErrors,loading} = useSelector(state=>state.AuthReducer)
  const [state, setState] = useState({
    email:"",password:""
  })

  const inputHandler = (e) =>{
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }

  const loginSubmit = (e) =>{
    e.preventDefault()
    dispatch(postLogin(state))
  }

  useEffect(() =>{
    if(loginErrors.length >0){
        loginErrors.map((error) =>toast.error(error.msg))
    }
  },[loginErrors])
  return (
    <>
   ( <Helmet>
    <title data-rh="true">Login</title>
    <meta name="description" content="user login form"/>
  </Helmet>)
      <div className="row mt-80">
        <div className="col-8">
          <BgImage />
          <Toaster position="top-right" reverseOrder="true" style={{fontSize:"16px"}}/>
        </div>

        <div className="col-4">
          <div className="account">
            <div className="account_section">
              <form onSubmit={loginSubmit}>
                <div className="group">
                  <h3 className="form-heading">Login</h3>
                </div>
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    className="group__control"
                    Placeholder="Enter the email"
                    onChange={inputHandler}
                  />
                </div>
                <div className="group">
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    className="group__control"
                    Placeholder="Enter the password"
                    onChange={inputHandler}
                  />
                </div>
                <div className="group">
                  <input
                    type="submit"
                    name=""
                    id=""
                    className="btn btn-default btn-block"
                  value={loading ?"...":"Login"}
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

export default Login;
