const express = require("express");

const router = express.Router();

const Feedbacks = require("../models/feedback");
const feedback = require("../models/feedback");

//test
router.get("/test",(req,res)=>res.send("Feedbacks routes working"));

router.post("/",(req,res)=>{
    Feedbacks.create(req.body)
    .then(()=>res.json({msg:"Feedback added successfully"}))
    .catch(()=>res.status(400).json({msg: "Feedback adding failed"}));
});

router.get("/",(req,res)=>{
    Feedbacks.find()
    .then((feedbacks)=>res.json(feedbacks))
    .catch((err)=>res.status(400).json({msg: "No feedbacks found"}));
});

router.get("/:id",(req,res)=>{
    Feedbacks
    .findById(req.params.id)
    .then((feedbacks)=>res.json(feedbacks))
    .catch(() =>res.status(400).json({msg: "cannont find this feedback"}));
});

router.put("/:id",(req,res)=>{
    Feedbacks.findByIdAndUpdate(req.params.id, req.body, { new: true})
    .then(()=> res.json({msg: "Update successfully"}))
    .catch(()=>res.status(400).json({ msg: "Update Failed"}));
 

});

router.delete("/:id",(req,res)=>{
    Feedbacks.findByIdAndDelete(req.params.id)
    .then((deletedFeeedback)=> {
        if(!deletedFeeedback) {
            return res.status(404).json({msg: "Feedbacck not found"});
        }
    res.json({msg: "Deleted successfully"})
    })
    .catch(()=>res.status(400).json({ msg:"cannot be delete"}));
 
});
module.exports = router;
