const express = require('express');
const router = express.Router();
const {getActivities,getActivity,addActivity,updateActivity, deleteActivity} = require('../controller/activityController');


router.get('/activity', getActivities)
router.post('/addActivity', addActivity)
router.get("/activity/:id",getActivity);
router.put('/updateActivity/:id', updateActivity)
router.delete('/deleteActivity/:id', deleteActivity)

module.exports = router;