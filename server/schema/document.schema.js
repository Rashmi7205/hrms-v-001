import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  documents: [
    {
      name: {
        type: String,
        required: true
      },
      fileId: {
        type: String,
        required: true
      },
      bucketId: {
        type: String,
        required: true
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Document', DocumentSchema);
