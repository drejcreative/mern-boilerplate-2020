const express = require('express');
const router = express.Router();

const { getList, addList, updateList, deleteList } = require('../controllers/list');

router.route('/')
  .get(getList)
  .post(addList)
  .delete(deleteList)
  .put(updateList)

module.exports = router;