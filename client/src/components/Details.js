import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postDetails } from './../store/asyncMethod/PostMethods';
import Loader from './Loader';
import moment from "moment";

const Details = () => {
    const {id} =useParams();
    const {loading, details} = useSelector(state=>state.PostReducer)
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(postDetails(id))
    },[id])
  return (
    <div className="container">
      <div className="row mt-100">
        <div className="col-8">
           {
            !loading ? 

            <div className="post__details">
                    <div className="post__header">
                            <div className="post__header__avatar">
                                {details.userName ? details.userName[0] :""}
                            </div>
                            <div className="post__header__user">
                                <span>{details.userName}</span>
                                <span>{moment(details.updatedAt).format("MMM Do YY")}</span>
                            </div>
                    </div>
                    <div className="post__body">
                    <h1 className="post__body_title">{details.title}</h1>
                </div>
                <div className="post__body__details">
                  {details.body}
                </div>
            </div>
            :
            <Loader/>
           }
        </div>
      </div>
    </div>
  );
};


export default Details