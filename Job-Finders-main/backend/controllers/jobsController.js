const mongoose = require("mongoose");
const Jobs = require("../models/jobsModel");
const { query } = require("express");

const createJob = async (req, res, next) => {
  try {
    const { company, position } = req.body;
    if (!company || !position) {
      next("Please provide all fields");
    }
    req.body.createdBy = req.user.userId;
    const job = await Jobs.create(req.body);

    res.status(201).send({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};
const getAllJobByUser = async (req, res, next) => {
  try {
    const { auth,status, workType, search,position ,sort,location } = req.query;
    const queryObject = {
      // createdBy: req.user.userId,
    };
    if(auth && auth === "company"){
      queryObject.createdBy = req.user.userId
    }
    if(location && location !== "all"){
      queryObject.workLocation=location
    }
    if (status && status !== "all") {
      queryObject.status = status;
    }
    if (workType && workType !== "all") {
      queryObject.workType = workType;
    }
    if (search || (position && position !== "all")) {
      queryObject.position = { $regex: search, $options: "i" };
    }
    var queryResult = Jobs.find(queryObject);
    if(sort === "latest"){
        queryResult= queryResult.sort("-createdBy")
    }
    if(sort === "oldest"){
        queryResult=queryResult.sort("createdBy")
    }
    if(sort === "a-z"){
        queryResult=queryResult.sort("createdBy")
    }
    if(sort === "A-Z"){
        queryResult=queryResult.sort("-createdBy")
    }
    const page =Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit;
    queryResult=queryResult.skip(skip).limit(limit);
    const totalJobs=await Jobs.countDocuments(queryResult)
    const numOfPage = Math.ceil(totalJobs/limit);
    const jobs = await queryResult;
    res.status(200).send({
      totalJobs: jobs.length,
      success: true,
      jobs,
      numOfPage
    });
    // const jobs = await Jobs.find({ createdBy: req.user.userId });
    // res.status(200).send({
    //   success: true,
    //   totalJobs: jobs.length,
    //   jobs,
    // });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company, position } = req.body;
    if (!company || !position) {
      next("Please Input all the fields");
    }
    const job = await Jobs.findOne({ _id: id });
    if (!job) {
      next(`No Jobs found with this id ${id}`);
    }
    if (req.user.userId != job.createdBy.toString()) {
      next("unAuthorized User");
    }
    const updateJob = await Jobs.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).send({
      success: true,
      message: "Updation Successfull",
      updateJob,
    });
  } catch (error) {
    next(error);
  }
};
const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findOne({ _id: id });
    if (!job) {
      next(`No Jobs found with this id ${id}`);
    }
    if (req.user.userId != job.createdBy.toString()) {
      next("unAuthorized User");
    }
    const result = await Jobs.findOneAndDelete({ _id: id });
    if (result) {
      res.status(200).send({
        success: true,
        message: "Deleted Successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
const jobStats = async (req, res, next) => {
  try {
    const {company,position}=req.body;
    const job = await Jobs.findOne({company : company,position:position})
    if(job){
      res.status(200).send({
        success : true,
        job
      })
    }
  } catch (error) {
    next(error);
  }
};
const getStatus = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error);
  }
};

module.exports = { createJob, getAllJobByUser, updateJob, deleteJob, jobStats };
