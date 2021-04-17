import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";
import ExerciseBarChart from "./ExerciseBarChart";

function Exercise(props) {
	const data = props.data
	console.log("exercise", props)
	let { topicId } = useParams();
	let exercise = topicId;
	console.log(exercise)
	// let name = topicId.charAt(0).toUpperCase() + topicId.slice(1);
	const exerciseInfo = data.filter(rating => rating.exercise === exercise)
	console.log("info", exerciseInfo)


	// filter data by value name, which is same as name
	// use that data in the chartcomponent
	// const getExerciseData = (exercise) => {
	// 	const exerciseData = data.filter(function (e) {
	// 		return e.exercise === exercise
	// 	})
	// 	return exerciseData;
	// }

	// const exerciseData = getExerciseData(exercise);


	return (
		<header className="Exercise" >
			<h1>{exercise}</h1>
			<ExerciseBarChart data={exerciseInfo} />
		</header >
	);
}

export default Exercise;
