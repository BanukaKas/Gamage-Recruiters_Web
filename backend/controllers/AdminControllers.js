// AdminController.js
const db = require("../utils/db");

// Controller to get all job postings
const getAllJobs = (req, res) => {
    const query = "SELECT * FROM postedjobs ORDER BY posted_at DESC";
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.json(results);
    });
};

// Controller to post a new job
const postJob = (req, res) => {
    const { job_title, state, salary, currency, location, description } = req.body;
    const query = "INSERT INTO postedjobs (job_title, state, salary, currency, location, description) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(query, [job_title, state, salary, currency, location, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.status(201).json({ message: "Job posted successfully", jobId: result.insertId });
    });
};

// Controller to delete a job posting
const deleteJob = (req, res) => {
    const { id } = req.params;
    
    const query = "DELETE FROM postedjobs WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Job post not found" });
        }
        res.json({ message: "Job post deleted successfully" });
    });
};

module.exports = { getAllJobs, postJob, deleteJob };
