import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fitnessGoal: {
      type: String,
      trim: true,
      default: 'general-fitness',
    },
    experienceLevel: {
      type: String,
      trim: true,
      default: 'beginner',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model('User', userSchema);
