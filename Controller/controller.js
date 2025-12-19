import Trip from "../Model/model.js";

// CREATE TRIP
export const createTrip = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('User from token:', req.user);
    
    const userId = req.user ? req.user._id || req.user.id : '507f1f77bcf86cd799439011';
    const trip = new Trip({ ...req.body, userId });
    console.log('Trip to save:', trip);
    
    await trip.save();

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: trip,
    });
  } catch (error) {
    console.log('Create trip error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to create trip",
      error: error.message,
    });
  }
};

// GET ALL TRIPS FOR LOGGED-IN USER
export const getAllTrips = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    console.error("GET TRIPS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trips",
      error: error.message,
    });
  }
};

// DELETE TRIP
export const deleteTrip = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { id } = req.params;
    const trip = await Trip.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found or you don't have permission",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TRIP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete trip",
      error: error.message,
    });
  }
};

// UPDATE TRIP
export const updateTrip = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { id } = req.params;
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true } // ensures Mongoose validates updates
    );

    if (!updatedTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found or you don't have permission",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      data: updatedTrip,
    });
  } catch (error) {
    console.error("UPDATE TRIP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update trip",
      error: error.message,
      details: error.errors || null,
    });
  }
};
