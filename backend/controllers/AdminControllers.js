// AdminController.js
const db = require("../utils/db");

// Controller to get all job postings, ensuring only one instance per job_title and state is returned
const getAllJobs = (req, res) => {
    const query = `
        SELECT pj.*, 
               (SELECT COUNT(*) 
                FROM postedjobs p 
                WHERE p.job_title = pj.job_title AND p.state = pj.state) AS applications_count
        FROM postedjobs pj 
        WHERE pj.id = (SELECT MIN(id) 
                       FROM postedjobs 
                       WHERE job_title = pj.job_title AND state = pj.state)
        ORDER BY pj.posted_at DESC
    `;
    
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
