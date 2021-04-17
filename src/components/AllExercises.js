import React from "react";
import {
	Switch,
	Route,
	useRouteMatch
} from "react-router-dom";
import ExerciseList from './ExerciseList'
import Exercise from './Exercise'

import { getExercises } from './utils'


function AllExercises(props) {
	const data = props.data
	const exercises = getExercises(data);
	let { path, url } = useRouteMatch();

	return (
		<main className="AllExercises">
			<h1>Exercises</h1>
			<Switch>
				<Route path={`${path}/:topicId`}>
					<Exercise
						data={data}
					/>
				</Route>
				<Route path={`${path}`}>
					<h2>Select an exercise to see how it has been rated by each student</h2>
					<ExerciseList exercises={exercises} path={path} url={url} />
				</Route>
			</Switch>
		</main>

	);
}



export default AllExercises;
