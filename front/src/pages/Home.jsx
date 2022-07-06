import React from "react";
import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContexts";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

export default function Home() {
	const { workouts, dispatch } = useWorkoutContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch("http://localhost:4000/api/workout");
			const data = await response.json();
			if (response.ok) {
				dispatch({ type: "SET_WORKOUTS", payload: data.workouts });
			}
		};
		fetchWorkouts();
	}, [dispatch]);
	console.log(workouts);
	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((work) => (
						<WorkoutDetails key={work._id} work={work} />
					))}
			</div>
			<WorkoutForm />
		</div>
	);
}
