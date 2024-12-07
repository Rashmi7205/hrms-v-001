import { Schema, model } from "mongoose";
import { LEAVE_TYPE_ENUM, LEAVE_STATUS_ENUM } from "../constansts.js";

const leaveSchema = new Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  empId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: {
    type: String,
    enum: LEAVE_TYPE_ENUM,
    required:true
  },
  fromDate: {
    type: Date,
  },
  toDate: {
    type: Date,
  },
  reason: { type: String },
  status: { type: String, enum: LEAVE_STATUS_ENUM },
}, { timestamps: true });
export default model('Leave', leaveSchema);
