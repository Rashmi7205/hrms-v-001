import Applicant from '../schema/applicant.schema.js';
import Job from '../schema/job.schema.js';
import ServerError from '../utils/server.error.js';
import { uploadFile } from '../utils/appwrite.js';
import dotenv from 'dotenv';

dotenv.config();

// Create a new applicant
export const createApplicant = async (req, res, next) => {
  try {
    const jobId = req.params?.id || null;
    const { name, email, phoneNumber, address, coverLetter, experiences, education, skills } = req.body;

    if (!name || !email || !phoneNumber || !jobId || !education || !skills) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found'});
    }
    const uid = job.uid;

    const applicant = new Applicant({
      uid,
      name,
      email,
      phoneNumber,
      address,
      coverLetter,
      jobId,
      experiences,
      education,
      skills,
    });

    await applicant.save();
    res.status(201).json({ success: true, message: "Applicant Created Successfully", data: applicant });
  } catch (error) {
    console.log(error.message);
    return next(new ServerError(500, "Internal Server Error"));
  }
};

// Upload applicant image
export const uploadApplicantImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const applicant = await Applicant.findById(id);
    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Applicant not found' });
    }

    const filePath = req.file.path;
    const uploadedFile = await uploadFile(filePath, process.env.APPWRITE_IMG_BUCKET_ID, req.file.filename);

    if (!uploadedFile) {
      return next(new ServerError(500, "Image upload failed"));
    }

    applicant.image = uploadedFile.$id;
    await applicant.save();

    res.status(200).json({ success: true, message: 'Image uploaded successfully', data: uploadedFile });
  } catch (error) {
    console.error(error.message);
    return next(new ServerError(500, "Internal Server Error"));
  }
};

// Upload applicant resume
export const uploadApplicantResume = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const applicant = await Applicant.findById(id);
    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Applicant not found' });
    }

    const filePath = req.file.path;
    const uploadedFile = await uploadFile(filePath, process.env.APPWRITE_DOCUMENT_BUCKET_ID, req.file.filename);

    if (!uploadedFile) {
      return next(new ServerError(500, "Resume upload failed"));
    }

    applicant.resume = uploadedFile.$id;
    await applicant.save();

    res.status(200).json({ success: true, message: 'Resume uploaded successfully', data: uploadedFile });
  } catch (error) {
    return next(new ServerError(500, "Internal Server Error"));
  }
};

//get Applicant by id
export const getApplicantById = async (req, res, next) => {
  try {
    const{ id }= req.params;
    if(!id){
      return res.status(400).json({ success: false, message: 'Invalid applicant id'});
    }
    const applicant = await Applicant.findById(id);
    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Applicant not found'});
    }
    res.status(200).json({ success: true, message: 'Applicant found', data:applicant});
  } catch (error) {
      return next(new ServerError(500, "Internal Server Error"));
  }
}

export const getAllApplicantList = async (req,res,next)=>{
  try {
    const id = req.user?.clerk_id; // uid
    
    if(!id){
      return res.status(400).json({ success: false, message: 'Unauthorized User'});
    }
    const applicantList = await Applicant.find({uid:id});
    if (!applicantList) {
      return res.status(404).json({ success: false, message: 'Applicant not found'});
    }
    res.status(200).json({ success: true, message: 'Applicant list found',applicantList});
  } catch (error) {
    next(new ServerError(501,"Internal Server Error"));
  }
}
export const getAllApplicantListByJobId=async (req,res,next)=>{
  try {
    const {id} = req.params;//job id
    if(!id){
      return res.status(400).json({ success: false, message: 'Invalid job id'});
    }
    const applicantList = await Applicant.find({ jobId: id });
    if (!applicantList) {
      return res.status(404).json({ success: false, message: 'Applicant not found'});
    }
    res.status(200).json({ success: true, message: 'Applicant list found',applicantList});
  } catch (error) {
    next(new ServerError(501,"Internal Server Error"));
  }
}
