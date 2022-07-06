require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workouts");
//express app
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use(
	cors({
		origin: "*",
	}),
);

//routes
app.use("/api/workout", workoutRoutes);

//Connect Db
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(port, () => {
			console.log("listening on port " + port);
		});
	})
	.catch((err) => console.error(err));
