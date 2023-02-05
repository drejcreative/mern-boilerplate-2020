const HofDetails = require("../models/hofDetailsModel");

// @desc   Get by Id
// @route  GET /api/v1/hof
exports.getById = async (req, res, next) => {
  try {
    const hofId = req.params.hofid;
    const list = await HofDetails.find({ HOF_ID: hofId });
    list.forEach((member) => {
      member.isHOF = member.HOF_FM_TYPE === "HOF";
    });
    return res.status(200).json({
      success: true,
      data: list,
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: "Server error",
    });
  }
};
