const activityModel = require('../models/activity');
const {protectedRoute} = require("../controller/authController");
const { validateYupSchema } = require('formik');

const getActivities =  async (req,res) => {
    const activities = await activityModel.find()
    res.json(activities);
}

const getActivity = async (req,res) => {
    const id = req.params.id;
    const activity = await activityModel.findById(id)
    res.json(activity);
   
}

const addActivity = (req,res) => {
    try{
    const {activityName, date, duration, description} = req.body;
     //user create in db
    activityModel.create({
        activityName, date, duration, description
     }).then((val)=> {
     res.status(201).send(val);
     }).catch((err)=>{
        res.status(500).send(err);
     })
     
    } catch(error){
        console.log(error);
   }
   
}

const updateActivity = (req,res) => {
    try{
    const id = req.params.id
    const {activityName, date, duration, description} = req.body
     //user create in db
    activityModel.findByIdAndUpdate(
        id,{activityName, date, duration, description}).then((val)=> {
            res.status(200).send(val);
            })
     
    } catch(error){
        console.log(error);
   }  
}

const deleteActivity = (req,res) => {
    try{
    const id = req.params.id;
     //user create in db
    activityModel.findByIdAndDelete(id).then((val)=> {
        res.status(200).send(val);
        })
    } catch(error){
        console.log(error);
   }  
}

module.exports = {
    getActivity,
    addActivity,
    updateActivity,
    deleteActivity,
    getActivities
}