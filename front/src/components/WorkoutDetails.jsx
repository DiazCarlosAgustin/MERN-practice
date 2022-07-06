import React from "react";

export default function WorkoutDetails({ work }) {
	return (
		<div className="workout-details">
			<h4>{work.title}</h4>
			<p>
				<strong>Load (Kg): </strong>
				{work.load}
			</p>
			<p>
				<strong>Reps: </strong>
				{work.reps}
			</p>
			<p>{work.createdAt}</p>
		</div>
	);
}
