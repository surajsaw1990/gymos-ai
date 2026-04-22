import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: 'strength',
    },
    durationMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
      min: 0,
    },
    scheduledFor: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model('Workout', workoutSchema);
