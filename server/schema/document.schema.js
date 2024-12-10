import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  uid:{type:String,required:true},
  emp_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Employee',required: true},
  name: {type: String,required: true},
  fileId: {type: String,required: true},
  bucketId: {type: String,required: true},
  uploadedAt: {type: Date,default: Date.now}

});
const Document = mongoose.model('Document', DocumentSchema);
export default Document;