import mongoose from 'mongoose';
const JobSchema = new mongoose.Schema(
  {
    uid:{type:String,required:true},
    jobTitle: { type: String, required: true },
    jobDept: { type: String, required: true },
    jobDescription: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Remote'],
      required: true,
    },
    jobLocation: { type: String, required: true },
    salary: { type: Number },
    noOfPositions: { type: Number, required: true },
    vacancyStatus: { type: String, enum: ['Open', 'Closed'], required: true },
    openingDate: { type: Date, required: true },
    closingDate: { type: Date },
    requiredWorkExperience: { type: String },
    education: { type: String, required: true },
    responsibilities: { type: String, required: true },
    duties: { type: String, required: true },
    contactPerson: {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
    additionalContact: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);
