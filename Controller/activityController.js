import Activity from '../Model/Activity.js';

export const getActivities = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user ? req.user._id || req.user.id : null;
    
    const activities = await Activity.find({ tripId, userId });
    
    res.status(200).json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activities',
      error: error.message
    });
  }
};

export const addActivity = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user ? req.user._id || req.user.id : null;
    
    const activity = new Activity({
      ...req.body,
      tripId,
      userId
    });
    
    await activity.save();
    
    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add activity',
      error: error.message
    });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user._id || req.user.id : null;
    
    const activity = await Activity.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update activity',
      error: error.message
    });
  }
};