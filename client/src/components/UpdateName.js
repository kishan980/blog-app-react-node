import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import { useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNameAction } from './../store/asyncMethod/ProfileMethods';
import toast ,{Toaster} from 'react-hot-toast';
import { RESET_UPDATE_IMAGE_ERRORS, } from "../store/types/PostTypes";
import { useHistory } from "react-router-dom";

const UpdateName = () => {
    const {push} = useHistory()
    console.log("🚀 ~ file: UpdateName.js:12 ~ UpdateName ~ push", push)
    const dispatch =useDispatch();
    const [userName,setUserName] =useState("")
    const {user:{name,_id}} = useSelector(state=>state.AuthReducer)
    const {loading, redirect} = useSelector(state=>state.PostReducer)
    const {updateErrors} = useSelector(state=>state.updateNameProfile)
    useEffect(() =>{
        setUserName(name)
    },[])
    const updateNameHandler = (e) =>{
        e.preventDefault();
        dispatch(updateNameAction({name: userName, id:_id}))
    }
    useEffect(() =>{
        if(updateErrors.length !==0){
            updateErrors.map((error)=>
                toast.error(error.msg)
            )
            dispatch({type:RESET_UPDATE_IMAGE_ERRORS})
        }
    },[updateErrors])

    useEffect(() =>{
        if(redirect) {
            push("/dashboard")
        }
    },[redirect])
  return (
    <>
      <Helmet>
        <title data-rh="true">Update Name</title>
        <meta
          name="description"
          content="update name"
        />
      </Helmet>

      <div className="container mt-100">
        <div className="row ml-minus-15 mr-minus-15">
          <div className="col-3 p-15">
            <Sidebar />
          </div>
          <div className="col-9 p-15">
            <div className="card">
              <h3 className="card__h3">Update Name</h3>
              <Toaster
              position="top-right"
              reverseOrder={true}
              toastOptions={{ style: { fontSize: "15px" } }}
            />
              <form onSubmit={updateNameHandler}>
                <div className="group">
                  <input
                    type="text"
                    name=""
                    className="group__control"
                    placeholder="name..."
                    onChange={(e)=>setUserName(e.target.value)}
                    value={userName}
                  />
                </div>
                <div className="group">
                  <input
                    type="submit"
                    value="Update Name"
                    className="btn btn-default btn-block"
                   
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

export default UpdateName;
