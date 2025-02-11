// AdminRoute.js
const express = require("express");
const { getAllJobs, postJob, deleteJob } = require("../controllers/AdminControllers");

const router = express.Router();

// Route to get all posted jobs
router.get("/jobs", getAllJobs);

// Route to post a new job
router.post("/jobs", postJob);

// Route to delete a job post
router.delete("/jobs/:id", deleteJob);



module.exports = router;
