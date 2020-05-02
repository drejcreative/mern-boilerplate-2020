const List = require('../models/listModel');

// @desc   Get all from List
// @route  GET /api/v1/list
exports.getList = async (req, res, next) => {
  try {
    const list = await List.find();
    return res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc   Add to List
// @route  POST /api/v1/list
exports.addList = async (req, res, next) => {
  try {
    const list = await List.create(req.body);
    return res.status(201).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.send(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc   Update List
// @route  PUT /api/v1/list
exports.updateList = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const newList = await List.findOneAndUpdate(
      { _id },
      req.body,
      { new: true }, // Return updated one
    );
    return res.status(200).json(newList);
  } catch (error) {
    res.send(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc   Delete List
// @route  DELETE /api/v1/list
exports.deleteList = async (req, res, next) => {
  try {
    console.log(req.body);

    const list = await List.findById(req.body.id);
    if (!list) {
      res.status(404).json({
        success: false,
        error: 'Not Found'
      });
    }

    await list.remove();
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {

  }
}