import mongoose,{Schema} from 'mongoose';

const EmployeeSchema = new Schema({
    uid:{type:String,required:true},
    emp_id:{type:String,required:true},
    name: { type: String, required: true },
    position: { type: String, required: true },
    dept_name: { type: String, required: true },
    date_of_joining: { type: Date, required: true },
    phone_number: { type: String, required: true },
    alternate_number:{type:String,required:true},
    email: { type: String, required: true,unique:true},
    passport_number: { type: String },
    passport_exp_date: { type: Date,},
    dob: { type: Date, required: true },
    profile_pic:{type:String},
    status:{type:String,default:"active"},
    skills:{type:[String]},
    marital_status:{type:String},
    bank_info: { type: [mongoose.Schema.Types.ObjectId], ref: 'BankInfo',},
    experiences: {type:[
        {
            company_name: String,
            designation: String,
            from: Date,
        from: Date,
            role_desc:String
        }
    ]},
    leaves: { type: [mongoose.Schema.Types.ObjectId], ref: 'Leave' },
  },{timestamps:true});


  const BankInfoSchema = new Schema({
    name_of_bank: { type: String, required: true },
    account_number:{type:String,required:true,unique:true},
    ifsc_no: { type: String, required: true },
    account_type: { type: String, required: true },
  },{timestamps:true});

export const BankInfo = mongoose.model('BankInfo', BankInfoSchema);
export default mongoose.model('Employee', EmployeeSchema);
