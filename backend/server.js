require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const adminRoutes = require("./routes/AdminRoute");
app.use("/api", adminRoutes);


const app = express();
const PORT = process.env.PORT || 7000; 

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Fetch all job postings
app.get("/api/jobs", (req, res) => {
    const sql = "SELECT * FROM postedjobs";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching jobs:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// Delete a job posting
app.delete("/api/jobs/:id", (req, res) => {
    const jobId = req.params.id;
    console.log(`Received delete request for job ID: ${jobId}`);

    const sql = "DELETE FROM postedjobs WHERE id = ?";
    db.query(sql, [jobId], (err, result) => {
        if (err) {
            console.error("Error deleting job:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            console.log(`No job found with ID: ${jobId}`);
            return res.status(404).json({ error: "Job not found" });
        }
        console.log(`Job with ID ${jobId} deleted successfully.`);
        res.json({ message: "Job deleted successfully" });
    });
});

const express = require("express");
const router = express.Router();
const db = require("../utils/db");

// Delete job by ID
router.delete("/jobs/:id", (req, res) => {
    const jobId = req.params.id;
    const sql = "DELETE FROM postedjobs WHERE id = ?";
    
    db.query(sql, [jobId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete job" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json({ message: "Job deleted successfully" });
    });
});

module.exports = router;


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
