import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;