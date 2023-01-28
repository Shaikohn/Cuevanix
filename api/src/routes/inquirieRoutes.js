const { Router } = require('express');
const { getInquieries, postInquirie, getInquirie, deleteInquirie, postInquirieAnswer, deleteInquirieAnswer } = require('../controllers/inquirieControllers');
const router = Router();

router.get('/all', getInquieries)
router.get('/:_id', getInquirie);
router.post('/', postInquirie);
router.post('/answer', postInquirieAnswer);
router.delete('/:_id', deleteInquirie);
router.delete('/answer/:userId/:_id', deleteInquirieAnswer);

module.exports = router 