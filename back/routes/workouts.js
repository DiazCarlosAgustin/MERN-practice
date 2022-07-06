const express = require("express");
const {
	createWorkout,
	getWorkout,
	getAllWorkout,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workoutController");
const Workout = require("../models/workout");

const Router = express.Router();

//all workouts
Router.get("/", getAllWorkout);

//GET a single workout
Router.get("/:id", getWorkout);

//POST a new workout
Router.post("/", createWorkout);

//DELETE a workout
Router.delete("/", deleteWorkout);

//UPDATE a  workout
Router.patch("/", updateWorkout);

module.exports = Router;
