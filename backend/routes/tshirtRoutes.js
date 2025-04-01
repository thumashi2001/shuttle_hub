const express = require('express');
const router = express.Router();
const tshirtController = require('../controllers/tshirtController');

router.post('/designs', tshirtController.createDesign);
router.get('/designs', tshirtController.getAllDesigns);
router.put('/designs/:id', tshirtController.updateDesign);
router.delete('/designs/:id', tshirtController.deleteDesign);

module.exports = router;