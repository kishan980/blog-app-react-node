import { Helmet } from "react-helmet";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const Create = () => {
  const [currentImage, setCurrentImage] = useState("Choose image");
  const [imagePreview, setImagePreview] = useState("");
  const [value, setValue] = useState("");
  const [slug, setSlug] = useState("");
  const [slugButton, setSlugButton] = useState(false);
  const [state, setState] = useState({
    title: "",
    description: "",
    image:""
  });
  const handleDescription = (e) =>{
        setState({
            ...state,
           [e.target.name]:e.target.value
        })
  }
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    const createSlug = e.target.value.trim().split(" ").join("-");
    setSlug(createSlug);
  };
  const slugHandle = (e) => {
    setSlug(e.target.value);
    setSlugButton(true);
  };
  const fileHandle = (e) => {
    setCurrentImage(e.target.files[0].name);
    setState({
        ...state,
        [e.target.name]:e.target.files[0]

    })
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUrl = (e) => {
    e.preventDefault();
    setSlug(slug.trim().split(" ").join("-"));
  };

  const createPost = (e)=>{
    e.preventDefault()
    console.log(state)
  }
  return (
    <div className="create mt-100">
      <Helmet>
        <title>crate new Post</title>
        <meta name="description" content="create a new post" />
      </Helmet>

      <div className="container">
        <form onSubmit={createPost}>
          <div className="row ml-minus mr-minus">
            <div className="col-6 p-15">
              <div className="card">
                <h3 className="card__h3">create a new post</h3>
                <div className="group">
                  <label htmlFor="title">Post title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={state.title}
                    onChange={handleInput}
                    className="group__control"
                    placeholder="Enter title..."
                  />
                </div>
                <div className="group">
                  <label htmlFor="image" className="image__label">
                    {currentImage}
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Enter title..."
                    onChange={fileHandle}
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
                  <input
                    type="submit"
                    value="Create post"
                    className="btn btn-default btn-block"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 p-15">
              <div className="card">
                <div className="group">
                  <label htmlFor="slug">Post slug</label>
                  <input
                    type="text"
                    value={slug}
                    name="slug"
                    id="slug"
                    placeholder="Post url..."
                    className="group__control"
                    onChange={slugHandle}
                  />
                </div>
                <div className="group">
                  {slugButton ? (
                    <button className="btn btn-default" onClick={handleUrl}>
                      update slug
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="group">
                  <div className="imagePreview">
                    {imagePreview ? <img src={imagePreview} alt="done" /> : ""}
                  </div>
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
                    onChange={handleDescription}
                  ></textarea>
                 <p className="length">
                 {
                    state.description ? state.description.length:0
                  }
                 </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
