import Job from '../schema/job.schema.js';
import ServerError from '../utils/server.error.js';

// Create a new job
export const createJob = async (req, res, next) => {
  try {
    const {clerk_id} = req.user;
    if(!clerk_id){
      return next(new ServerError('Unauthorized User', 400));
    }
    const { jobTitle, jobDept, jobDescription, employmentType, jobLocation, salary, noOfPositions, vacancyStatus, openingDate, closingDate, reqWorkExp, education, responsibilities, duties, contactPersonName, contactPersonPhoneNumber, contactPersonEmail, additionalContact } = req.body;

    if (!jobTitle || !jobDept || !jobDescription || !employmentType || !jobLocation || !salary || !noOfPositions || !vacancyStatus || !openingDate || !closingDate || !reqWorkExp || !education) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const job = new Job({
      uid:clerk_id,
      jobTitle,
      jobDept,
      jobDescription,
      employmentType,
      jobLocation,
      salary,
      noOfPositions,
      vacancyStatus,
      openingDate,
      closingDate,
      reqWorkExp,
      education,
      responsibilities,
      duties,
      contactPerson:{
        name:contactPersonName,
        phoneNumber:contactPersonPhoneNumber,
        email:contactPersonEmail,
      },
      additionalContact,
    });

    await job.save();
    res.status(200).json({ success: true, message: "Job Created Successfully" });
  } catch (error) {
    console.log(error.message);
    return next(new ServerError(501, "Internal Server Error"));
  }
};

// Get all jobs
export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({uid:req.user.clerk_id});
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    return next(new ServerError(501, "Internal Server Error"));
  }
};

// Get a single job by ID
export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    return next(new ServerError(501, "Internal Server Error"));
  }
};

// Update a job
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, message: "Job Updated Successfully", data: job });
  } catch (error) {
    return next(new ServerError(501, "Internal Server Error"));
  }
};

// Delete a job
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    return next(new ServerError(501, "Internal Server Error"));
  }
};
