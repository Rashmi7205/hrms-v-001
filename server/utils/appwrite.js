import { Client, ID, InputFile, Storage } from 'node-appwrite';
import fs from 'fs';
import { config } from 'dotenv';

config();
const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_URL)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);

export const uploadFile = async (filePath,bucketId,filename) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist at the specified path.');
    }

    const result = await storage.createFile(
      bucketId,
      ID.unique(),
      InputFile.fromPath(`${filePath}`, filename)
    );
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    console.error('File upload failed:', error);
    return null;
  }
};
export const getSavedDocuments=async(fileId,bucketId)=>{
  try {
    if(!fileId || !bucketId) throw new Error("File Id Missing");
    const result = storage.getFileView(bucketId,fileId);
    return result;
  } catch (error) {
    return error;
  }
}
export const updateDocument = async(bucketId,fileId,filePath)=>{
  try {
    if (!fileId || !bucketId) throw new Error("File Id Missing");
    const result = await storage.updateFile(bucketId,fileId,InputFile.fromPath(filePath));
    return result;
  } catch (error) {
    return error;
  }
}
export const deleteDocument = async(bucketId,fileId)=>{
  try {
    if(!fileId) throw new Error("File Id Missing");
    const result = await storage.deleteFile(bucketId,fileId);
    return result;
  } catch (error) {
    return error;
  }
}