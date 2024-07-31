const userModel = require('../models/userModel');

async function userDetails(req, res) {
  try {
    // console.log("User ID:", req.user.id);

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true
      });
    }

    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "User details"
    });
    console.log("User:", user);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true
    });
  }
}

module.exports = { userDetails };
