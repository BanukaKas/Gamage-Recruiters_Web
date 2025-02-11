import React from "react";
import { FaClipboardList, FaBriefcase, FaTrashAlt } from "react-icons/fa";
import Navbar from "../../components/templates/AdminNavbar";
import Footer from "../../components/templates/Footer";
import Sidebar from "../../components/templates/ASidebar";
import "../../css/AdminOverviewPage.css";

const AdminDashboard = () => {
  return (
    <div className="admin-overview-wrapper">
      <Navbar />
      <div className="admin-overview-content">
        <Sidebar />
        <div className="admin-overview-container">
          <h2>Hello, Welcome</h2>
          <p>Here Is Your Daily Activities And Applications</p>
          <div className="admin-stats">
             <div className="stat-box purple">
               <div className="stat-text">
                 <h3>10</h3>
                 <p>Posted Jobs</p>
               </div>
               <FaBriefcase className="stat-icon" />
             </div>
           <div className="stat-box orange">
         <div className="stat-text">
           <h3>118</h3>
           <p>New Applications</p>
         </div>
         <FaClipboardList className="stat-icon" />
           </div>
           </div>


          <div className="admin-table">
            <h3 className="table-title">Recently Posted Jobs</h3>
            <table>
              <thead>
                <tr>
                  <th>JOBS</th>
                  <th>STATE</th>
                  <th>APPLICATIONS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {["UI/UX Designer", "Front End Developer", "Human Resource", "Graphic Designer"].map((job, index) => (
                  <tr key={index}>
                    <td>{job}</td>
                    <td>{index % 2 === 0 ? "Senior" : "Junior"}</td>
                    <td>{Math.floor(Math.random() * 50) + 10} Applications</td>
                    <td>
                      <button className="view-btn">View Application</button>
                      <button className="delete-btn"><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
