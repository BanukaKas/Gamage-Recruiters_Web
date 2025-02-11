import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../../css/ASidebar.css';
import { FaClipboardList, FaPlusCircle, FaBriefcase, FaSignOutAlt } from 'react-icons/fa';

const ASidebar = () => {
  return (
    <div className="Asidebar">
      <ul>
        <li>
          <Link to="/Admin-over-viewpage" className="sidebar-link">
            <FaClipboardList className="icon" />
            <span>Overview</span>
          </Link>
        </li>
        <li>
          <Link to="/post-job" className="sidebar-link">
            <FaPlusCircle className="icon" />
            <span>Post a Job</span>
          </Link>
        </li>
        <li>
          <Link to="/Admin_my_job" className="sidebar-link">
            <FaBriefcase className="icon" />
            <span>My Jobs</span>
          </Link>
        </li>
      </ul>
      <ul className="logout">
        <li>
          <Link to="/logout" className="sidebar-link">
            <FaSignOutAlt className="icon" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ASidebar;
