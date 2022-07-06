import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContexts";

export default function WorkoutForm() {
	const { dispatch } = useWorkoutContext();

	let titleRef = useRef("");
	let loadRef = useRef(0);
	let repsRef = useRef(0);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(titleRef);
		const workout = {
			title: titleRef.current.value,
			load: loadRef.current.value,
			reps: repsRef.current.value,
		};
		const response = await fetch("http://localhost:4000/api/workout", {
			method: "POST",
			body: JSON.stringify(workout),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		} else {
			titleRef = "";
			loadRef = 0;
			repsRef = 0;
			setError(null);
			dispatch({ type: "CREATE_WORKOUTS", payload: json });
		}
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a new Workout</h3>

			<div>
				<label>Excersize Title:</label>
				<input type="text" name="title" id="title" ref={titleRef} />
			</div>
			<div>
				<label>Load (in Kg):</label>
				<input type="number" name="load" id="load" ref={loadRef} />
			</div>
			<div>
				<label>Reps:</label>
				<input type="text" name="rep" id="rep" ref={repsRef} />
			</div>
			<div>
				<button>Add Workout</button>
			</div>
			{error && <div className="error">{error}</div>}
		</form>
	);
}
