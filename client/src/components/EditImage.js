import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateImageAction } from "../store/asyncMethod/PostMethods";
import toast, { Toaster } from "react-hot-toast";
import { RESET_UPDATE_IMAGE_ERRORS } from "../store/types/PostTypes";
import { getById } from './../store/asyncMethod/PostMethods';

const EditImage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { updateImageErrors } = useSelector((state) => state.UpdateImage);
  const { redirect } = useSelector((state) => state.PostReducer);
  const { post} = useSelector((state) => state.getByIdPost);
  console.log("🚀 ~ file: EditImage.js:17 ~ EditImage ~ post", post.image)



  const [state, setState] = useState({
    image: "",
    imagePreview: "",
    imageName: "ChooseImage",
    oldImage: "",
  });
  const [OldImg,setOldImg] = useState('')
  const fileHandle = (e) => {
    if (e.target.files.length[0] !== 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({
          ...state,
          imagePreview: reader.result,
          image: e.target.files[0],
          imageName: e.target.files[0].name,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const updateImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", state.image);
    dispatch(updateImageAction(formData));
  };
  useEffect(() => {
    if (updateImageErrors.length !== 0) {
      updateImageErrors.map((error) => toast.error(error.msg));
      dispatch({ type: RESET_UPDATE_IMAGE_ERRORS });
    }
  }, [updateImageErrors]);
  useEffect(() => {
    if (redirect) {
      history.push("/dashboard");
    }
  }, [redirect]);

  useEffect(() => {
    dispatch(getById(id));
    if(post){
      setOldImg(post.image)
      // setState({
      //   ...state,
      //   oldImage:post.image
      // })
    }
  }, [id]);

  

  return (
    <>
      <Helmet>
        <title>update image Post</title>
        <meta name="description" content="updated image" />
      </Helmet>

      <div className="container mt-100">
        <div className="row">
          <div className="col-6">
            <div className="card">
              <h3 className="card__h3">Update post Images</h3>
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                  style: {
                    fontSize: "14px",
                  },
                }}
              />

              <form onSubmit={updateImage}>
                <div className="group">
                  <label htmlFor="image" className="image__label">
                    {state.imageName}
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={fileHandle}
                  />
                </div>
                <div className="group">
                  <div className="imagePreview">
                    {state.imagePreview ? (
                      <img src={state.imagePreview} />
                    ) : (
                      <img src={`/images/${OldImg}`} alt={state.oldImage} />
                    )}
                  </div>
                </div>

                <div className="group">
                  <input
                    type="submit"
                    value="Update Image Post"
                    className="btn btn-default btn-black"
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

export default EditImage;
