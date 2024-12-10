import Employee,{BankInfo} from '../schema/employee.schema.js';
import { uploadFile } from '../utils/appwrite.js';
import ServerError from '../utils/server.error.js';
import Document from '../schema/document.schema.js';

const createNewEmployee = async (req,res,next)=>{
  try{
    const {emp_id,name,position,dept_name,date_of_joining,phone_number,alternate_number,email,passport_number,passport_exp_date,dob,skills,marital_status} = req.body;
    if (!emp_id||! name||! position||! dept_name||! date_of_joining||! phone_number||! alternate_number||! email||! passport_number||! passport_exp_date||! dob||! skills||! marital_status){
      return res.status(400).json({message: 'Please fill all the fields'});
    }
    const isExistingEmp = await Employee.findOne({
      emp_id: emp_id,
      email:email
    });
    if (isExistingEmp) {
      return res.status(400).json({success:false,message: 'Employee already exists'});
    }
    const uid = req.user.clerk_id ;
    if(!uid){
      return res.status(400).json({success:false,message: 'Unauthorized User!'});
    }
    const newEmp = {
      uid,
      emp_id, name, position, dept_name, date_of_joining, phone_number, alternate_number, email, passport_number, passport_exp_date, dob, skills, marital_status,bank_info:[],experiences:[]
    }
    if (Array.isArray(req.body.bank_info)){
      req.body.bank_info.forEach(async (bankInfo)=>{
        const {name_of_bank,account_number,ifsc_no,account_type} = bankInfo;
        if(!name_of_bank || !account_number || !ifsc_no || !account_type){
          return res.status(400).json({success:false,message: 'Please fill all the fields for bank info'});
        }
        const isAccountExist = await BankInfo.findOne({account_number:account_number});
        if(isAccountExist){
            return res.status(400).json({
              success:false,message: 'Account already exists'
            });
        }
        const newBankInfo = await BankInfo.create(bankInfo);
        if(newBankInfo){
            newEmp.bank_info.push(newBankInfo._id);
        }else{
            return res.status(401).json({
              success:false,
              message:"Failed To Save Bank Information"
            });
        }
      });
    }
    if(req.body.experiences){
       req.body.experiences?.forEach(async (experience)=>{
         const { company_name, designation, from, to, role_desc } = experience;
         if(!company_name || !designation || !from || !to || !role_desc){
          return res.status(400).json({success:false,message: 'Please fill all the fields for Expeience'});
        }
        newEmp.experiences.push({
          company_name, designation, from, to, role_desc
        });
       });
    }
    const newEmpCreated = await Employee.create(newEmp);
    await newEmpCreated.save();
    if(!newEmpCreated){
      return res.status(401).json({
        success:false,
        message:"Failed Create Employee"
      });
    }
    return res.status(201).json({
      success:true,message:"Employee Created Successfully"
    });
  }catch(error){
    return next(new ServerError(501,error.message));
  }
}

const saveEmpDocumentDetails  = async(req,res,next)=>{
  try{
    if(!req.user){
      return next(new ServerError(401,"Unauthenticated User"));
    }
    if(!req.files){
      return next(new ServerError(401,"There Is No files To upload"));
    }
    const {docName,empId} = req.body;
    if(!empId) {
      return next(new ServerError(401,"Emp Id is Missing"));
    }
    req.files.forEach(async (file)=>{
      const uploadedFile = await uploadFile(file.path, process.env.APPWRITE_DOCUMENT_BUCKET_ID,docName);
      if(uploadedFile){
        const document =await Document.create({
          uid:req.user.clerk_id,
          emp_id:empId,
          name:docName,
          fileId:uploadedFile.$id,
          bucketId:uploadedFile.bucketId
        });
        await document.save();
      }
    });
    return res.status(201).json({
      success:true,message:"Document Uploaded Successfully"
    });
  }catch(error){
    return next(new ServerError(501,error));
  }
}

export {
  createNewEmployee,
  saveEmpDocumentDetails
}