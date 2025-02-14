import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Navbar from "../../components/templates/AdminNavbar";
import Footer from "../../components/templates/Footer";
import Sidebar from "../../components/templates/ASidebar";
import '../../css/Admin/Admin_my_job.css';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import adminLBoxImage from '../../assets/admin_l_box.jpg';
import Toast from 'react-bootstrap/Toast';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]); // Ensure jobs is always an array
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7000/api/jobs")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]); // Fallback to empty array if response is not an array
        }
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
        setJobs([]); // Handle errors gracefully
      });
  }, []);

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedJob) return;
    try {
      const response = await fetch(`http://localhost:7000/api/jobs/${selectedJob.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setJobs(jobs.filter(job => job.id !== selectedJob.id));
        setToastMessage({ type: 'success', text: 'Job deleted successfully!' });
      } else {
        setToastMessage({ type: 'error', text: 'Failed to delete job!' });
      }
    } catch (error) {
      setToastMessage({ type: 'error', text: 'Error deleting job!' });
    } finally {
      setShowModal(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="Admin_my_job-wrapper">
      <Navbar />
      <div className="Admin_my_job-content">
        <Sidebar />
        <div className="Admin_my_job-container center-container">
          <div className="table-container">
            <h1 className="table-title">My Jobs ({jobs.length})</h1>
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
                {(jobs || []).map((job) => ( // Ensure jobs is always iterable
                  <tr key={job.id}>
                    <td>{job.job_title}</td>
                    <td>{job.state}</td>
                    <td>{job.applications_count || 0}</td> {/* Display application count */}
                    <td>
                      <button className="view-btn">View Applications</button>
                      <button className="delete-btn" onClick={() => handleDeleteClick(job)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}>
            <img
              src={adminLBoxImage}
              alt="Delete Confirmation"
              style={{ width: '300px', height: 'auto', marginBottom: '20px' }}
            />
            <p>Are you sure you want to permanently delete the job post: <strong>{selectedJob?.job_title}</strong>?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete Job Post
          </Button>
        </Modal.Footer>
      </Modal>

      {toastMessage && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <Toast onClose={() => setToastMessage(null)} show={true} delay={3000} autohide bg={toastMessage.type === 'success' ? 'success' : 'danger'}>
            <Toast.Body className="text-white">{toastMessage.text}</Toast.Body>
          </Toast>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
