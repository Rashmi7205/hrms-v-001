import mongoose from 'mongoose';
const ApplicantSchema = new mongoose.Schema(
  {
    uid:{type:String,required:true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: String },
    image: { type: String },
    resume: { type: String},
    coverLetter: { type: String },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    experiences: [
      {
        companyName: { type: String, required: true },
        designation: { type: String, required: true },
        from: { type: Date, required: true },
        to: { type: Date },
        description: { type: String },
      },
    ],
    education: { type: String, required: true },
    skills: { type: [String], required: true },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Interviewed', 'Hired', 'Rejected'],
      default: 'Applied',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Applicant',ApplicantSchema);
