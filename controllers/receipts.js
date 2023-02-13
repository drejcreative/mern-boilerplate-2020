const countersModel = require("../models/countersModel");
const Receipts = require("../models/receiptsModel");
const { updateTakhmeenForm } = require("./takhmeenForm");

// @desc   Get all from receipts
// @route  GET /api/v1/receipts
exports.get = async (req, res) => {
  try {
    const receipts = await Receipts.find();
    res.status(200).json({
      success: true,
      data: receipts,
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

// get receipts for by HOF ID - usefull to get all receipts of HOF at once
exports.getByHOF = async (req, res) => {
  try {
    const hofId = req.params.hofid;
    const receipts = await Receipts.find({ HOFId: hofId });
    res.status(200).json({
      success: true,
      data: receipts,
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

// @desc   Add to receipt
// @route  POST /api/v1/receipts
exports.add = async (req, res) => {
  try {
    const counterSeq = await countersModel.findByIdAndUpdate(
      { _id: "RECEIPTS" },
      { $inc: { seq: 1 } },
      { new: true }
    );
    const receipt = await Receipts.create({
      ...req.body,
      receiptNo: `1444H/${counterSeq.seq}`,
    });
    const { HOFId, amount } = req.body;
    await updateTakhmeenForm(HOFId, { paidAmount: amount }, true);
    res.status(201).json({
      success: true,
      data: receipt,
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
