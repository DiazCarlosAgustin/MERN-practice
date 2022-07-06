const Workout = require("../models/workout");
const mongoose = require("mongoose");

//get all workout
const getAllWorkout = async (req, res) => {
	const workouts = await Workout.find().sort({ createdAt: -1 });

	res.status(200).json({ workouts });
};

const getWorkout = async (req, res) => {
	const { id } = req.params;
	const workout = await Workout.findById(id);

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ error: "El id no es valido" });
	}

	if (!workout) {
		res.status(404).json({ error: "No se encontraron Workout" });
	}

	res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
	const { title, reps, load } = req.body;

	//add to db
	try {
		const workout = await Workout.create({
			title,
			reps,
			load,
		});
		res.status(200).json(workout);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const deleteWorkout = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ error: "No se encontro el Workout" });
	}

	const workout = await Workout.findOneAndDelete({ _id: id });

	if (!workout) {
		res.status(404).json({ error: "No se encontro el Workout" });
	}

	res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ error: "No se encontro el Workout" });
	}

	const workout = await Workout.findOneAndUpdate(
		{ _id: id },
		{ ...req.body },
	);

	if (!workout) {
		res.status(404).json({ error: "No se encontro el Workout" });
	}

	res.status(200).json(workout);
};

module.exports = {
	createWorkout,
	getAllWorkout,
	getWorkout,
	deleteWorkout,
	updateWorkout,
};
