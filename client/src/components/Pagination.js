import { Link,useNavigate } from "react-router-dom";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { useEffect } from 'react';
const Pagination = ({ count, perPage, page, path }) => {
  console.log("🚀 ~ file: Pagination.js:5 ~ Pagination ~ page", page)
  // const navigate = useNavigate()
  if (page === undefined) {
   page = 1;
  }
  let totalPages = Math.ceil(count / perPage);
  console.log("🚀 ~ file: Pagination.js:10 ~ Pagination ~ totalPages", totalPages)
  let startLoop = parseInt(page);
  let diff = totalPages - parseInt(page);
  if (diff <= 3) {
    startLoop = totalPages - 3;
  }

  let endLoop = startLoop + 3;
  if (startLoop <= 0) {
    startLoop = 1;
  }

  const links = () => {
    const store = [];
    for (let i = startLoop; i <= endLoop; i++) {
      store.push(
        <li key={i} className={i === parseInt(page) ? 'active':''}>
          <Link to={`/${path}/${i}`}>{i}</Link>
        </li>
      );
    }
    return store;
  };
  const next = () => {
    if (page < totalPages) {
      return (
        <li>
          <Link to={`/${path}/${parseInt(page )+ 1}`}>
            <BsChevronDoubleRight />
          </Link>
        </li>
      );
    }
  };
  const prev = () => {
    if (page > 1) {
      return (
        <li>
          <Link to={`/${path}/${parseInt(page )- 1}`}>
            <BsChevronDoubleLeft />
          </Link>
        </li>
      );
    }
  };
  // useEffect(()=>{
  //   if(totalPages !== page){
  //     navigate(`/${path}/${totalPages}`)
  //   }
  // },[totalPages]);
  return totalPages && count >10?  (
    <div className="pagination">
      {prev()}
      {links()}
      {next()}
    </div>
  ):'';
};
export default Pagination;
