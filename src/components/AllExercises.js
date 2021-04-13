import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";
import ExerciseList from './ExerciseList'
import Exercise from './Exercise'

import { onlyUnique, getNames, getExercises } from './utils'


function AllExercises(props) {
	const data = props.data
	console.log(data)
	const exercises = getExercises(data);
	console.log("Exercises", exercises)
	let { path, url } = useRouteMatch();
	console.log("Students page")
	return (
		<main className="AllExercises">
			<h1>Exercises</h1>
			<h2>Select a student to see their profile and how they rated each exercise</h2>
			<ExerciseList exercises={exercises} path={path} url={url} />

			<Switch>
				<Route path={`${path}/:topicId`}>
					<Exercise
						name={url}
						data={data}
						students={props.students}
					/>
				</Route>
			</Switch>
		</main>

	);
}



export default AllExercises;
