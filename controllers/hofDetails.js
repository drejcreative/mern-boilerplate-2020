const HofDetails = require("../models/hofDetailsModel");

// @desc   Get members using ITS of any family member
// @route  GET /api/v1/hof
exports.getById = async (req, res) => {
  try {
    const itsid = req.params.itsid;
    const member = await HofDetails.findOne({ ITS_ID: itsid });
    const list = await HofDetails.find({ HOF_ID: member?.HOF_ID });

    list?.forEach((member) => {
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
