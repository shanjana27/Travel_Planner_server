import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // references a user
      ref: "User",
      required: true, // every trip must belong to a user
    },
    name: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    travelType: {
      type: String,
      enum: ["Solo", "Friends", "Family", "Couple"],
      default: "Solo",
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
