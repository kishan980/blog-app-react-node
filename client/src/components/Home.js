import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { HomePosts } from "../store/asyncMethod/PostMethods";
import { useParams,Link } from "react-router-dom";
import Loader from "./Loader";
import moment from "moment";
import { htmlToText } from "html-to-text";
import Pagination from './Pagination';

const Home = () => {
  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.PostReducer);
  const { perPage, count, posts } = useSelector((state) => state.fetchPost);

  useEffect(() => {
    dispatch(HomePosts(page));
  }, [page]);
  return (
    <>
      ({" "}
      <Helmet>
        <title data-rh="true">Web articles</title>
        <meta
          name="description"
          content="Learn, html, css, java, script, react, node, rest, api"
        />
      </Helmet>
      )
      <div className="container">
        <div className="row mt-100" style={{marginBottom:'100px'}}>
          <div className="col-9 home">
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div className="row post-style" key={post._id} >
                    <div className="col-8">
                      <div className="post">
                        <div className="post__header">
                            <div className="post__header__avatar">
                            {post.userName[0]}
                            </div>
                            <div className="post__header__user">
                                <span>{post.userName}</span>
                                <span>{moment(post.updatedAt).format("MMM Do YY")}</span>
            
                            </div>
                        </div>
                        <div className="post__body">
                            <h1 className="post__body_title"><Link to={`/details/${post._id}`}>{post.title}</Link></h1>
                        </div>
                        <div className="post__body__details">
                          {htmlToText(post.body.slice(0,300))}
                        </div>
                      </div>
                    </div>
                    <div className="col-4 ">
                     <div className="post__image">
                     <img src={`/images/${post.image}`} alt={post.image}/>
                     </div>
                    </div>
                  </div>
                ))
              ) : (
                "No posts"
              )
            ) : (
              <Loader />
            )}
        
          </div>
        </div>
        <div className="row">
              <div className="col-9">
              <Pagination path="home" count={count} perPage={perPage} page={page}/>
              </div>
        </div>
      </div>
    </>
  );
};


export default Home;
