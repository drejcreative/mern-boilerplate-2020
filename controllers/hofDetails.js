const HofDetails = require("../models/hofDetailsModel");

// @desc   Get by Id
// @route  GET /api/v1/hof
exports.getById = async (req, res) => {
  try {
    const hofId = req.params.hofid;
    const list = await HofDetails.find({ HOF_ID: hofId });
    list.forEach((member) => {
      member.isHOF = member.HOF_FM_TYPE === "HOF";
    });
    res.status(200).json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.log("API error", error);
    if (!res.headersSent) {
      res.send(500).json({
        success: false,
        error: "Server error",
      });
    }
  }
};
