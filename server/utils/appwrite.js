import { Client, ID, InputFile, Storage } from 'node-appwrite';
import fs from 'fs';
import path from 'path';
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
    return result;
  } catch (error) {
    console.error('File upload failed:', error);
    return null;
  }
};