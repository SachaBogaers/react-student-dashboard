import { useParams } from "react-router-dom";
import ExerciseBarChart from "./ExerciseBarChart";

function Exercise(props) {
	const data = props.data
	let { topicId } = useParams();
	let exercise = topicId;
	const exerciseInfo = data.filter(rating => rating.exercise === exercise)

	return (
		<header className="Exercise" >
			<h1>{exercise}</h1>
			<ExerciseBarChart data={exerciseInfo} />
		</header >
	);
}

export default Exercise;
