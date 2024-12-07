import mongoose,{Schema} from 'mongoose';

const EmployeeSchema = new Schema({
    uid:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    name: { type: String, required: true },
    position: { type: String, required: true },
    deptName: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    phoneNumber: { type: String, required: true },
    alternateNumber:{type:String,required:true},
    email: { type: String, required: true,unique:true},
    passportNumber: { type: String },
    passportExpDate: { type: Date,},
    dob: { type: Date, required: true },
    profilePic:{type:String},
    status:{type:String,default:"active"},
    skills:{type:[String]},
    maritalStatus:{type:String},
    bankInfo: { type: [mongoose.Schema.Types.ObjectId], ref: 'BankInfo',},
    experiences: {type:[
        {
            company_name: String,
            designation: String,
            from: Date,
            to: Date,
            desc:String
        }
    ]},
    leaves: { type: [mongoose.Schema.Types.ObjectId], ref: 'Leave' },
  },{timestamps:true});


  const BankInfoSchema = new Schema({
    nameOfBank: { type: String, required: true },
    accountNumber:{type:String,required:true},
    panNo: { type: String,},
    ifscNo: { type: String, required: true },
  },{timestamps:true});

export const BankInfo = mongoose.model('BankInfo', BankInfoSchema);
export default mongoose.model('User', EmployeeSchema);
