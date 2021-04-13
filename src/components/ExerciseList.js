import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";

function Studentlist(props) {
	const exercises = props.exercises
	const url = props.url
	return (
		<ul className="ExerciseList">
			{exercises.map(exercise => {
				return (<li>
					<Link to={`${url}/${exercise.toLowerCase()}`} key={exercise}>{exercise}</Link>
				</li>)
			})}
		</ul>
	);
}

export default Studentlist;

