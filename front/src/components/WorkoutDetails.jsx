import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContexts";
import { formatDistanceToNow } from "date-fns";
export default function WorkoutDetails({ work }) {
	const { dispatch } = useWorkoutContext();
	const handleClick = async () => {
		const response = await fetch(
			"http://localhost:4000/api/workout/" + work._id,
			{
				method: "DELETE",
			},
		);
		const data = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_WORKOUT", payload: data });
		}
	};
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
			<p>
				{formatDistanceToNow(new Date(work.createdAt), {
					addSuffix: true,
				})}
			</p>
			<span onClick={handleClick} className="">
				Delete
			</span>
		</div>
	);
}
