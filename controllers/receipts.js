const Receipts = require("../models/receiptsModel");
const { updateTakhmeenForm } = require("./takhmeenForm");

// @desc   Get all from receipts
// @route  GET /api/v1/receipts
exports.get = async (req, res, next) => {
  try {
    const receipts = await Receipts.find();
    return res.status(200).json({
      success: true,
      data: receipts,
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// get receipts for by HOF ID - usefull to get all receipts of HOF at once
exports.getByHOF = async (req, res, next) => {
  try {
    const hofId = req.params.hofid;
    const receipts = await Receipts.find({ HOFId: hofId });
    return res.status(200).json({
      success: true,
      data: receipts,
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// @desc   Add to receipt
// @route  POST /api/v1/receipts
exports.add = async (req, res, next) => {
  try {
    const receipt = await Receipts.create(req.body);
    const { HOFId, amount } = req.body;
    await updateTakhmeenForm(HOFId, { paidAmount: amount }, true);
    return res.status(201).json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: "Server error",
    });
    return;
  }
};
