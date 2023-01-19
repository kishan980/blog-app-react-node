import { Link } from "react-router-dom";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
const Pagination = ({ count, perPage, page }) => {
  if (page === undefined) {
   page = 1;
  }
  let totalPages = Math.ceil(count / perPage);
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
          <Link to={`/dashboard/${i}`}>{i}</Link>
        </li>
      );
    }
    return store;
  };
  const next = () => {
    if (page < totalPages) {
      return (
        <li>
          <Link to={`/dashboard/${parseInt(page )+ 1}`}>
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
          <Link to={`/dashboard/${parseInt(page )- 1}`}>
            <BsChevronDoubleLeft />
          </Link>
        </li>
      );
    }
  };
  return totalPages && count >10?  (
    <div className="pagination">
      {prev()}
      {links()}
      {next()}
    </div>
  ):'';
};
export default Pagination;