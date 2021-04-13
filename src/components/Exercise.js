import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";
import BarChart from "./BarChart";

function Exercise(props) {
	const data = props.data
	console.log("exercise", data)
	// let { topicId } = useParams();
	// let name = topicId.charAt(0).toUpperCase() + topicId.slice(1);
	// const studentInfo = props.students.filter(student => student.name === name)[0]


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
			<h1>This is Exercise</h1>
			{/* <BarChart data={exerciseData} /> */}
		</header >
	);
}

export default Exercise;
