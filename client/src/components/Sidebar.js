import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__element">
        <h3>Setting</h3>
      </div>
      <div className="sidebar__element">
        <Link to="/change-password">Change Password</Link>
      </div>
      <div className="sidebar__element">
      <Link to="/update-name">Change Name</Link>
    </div>
    </div>
  );
};

export default Sidebar;
