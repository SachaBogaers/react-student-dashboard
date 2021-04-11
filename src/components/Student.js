import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";
import ChartComponent from "./ChartComponent";

function Student(props) {
	const data = props.data
	console.log("indiv students data", data)

	let { topicId } = useParams();
	let name = topicId.charAt(0).toUpperCase() + topicId.slice(1);
	// filter data by value name, which is same as name
	// use that data in the chartcomponent
	const getStudentData = (name) => {
		const studentData = data.filter(function (e) {
			return e.name === name
		})
		return studentData;
	}

	const studentData = getStudentData(name);
	console.log(studentData)

	return (

		<header className="Student">
			<h1>{name}</h1>
			<ChartComponent data={studentData} />
		</header>
	);
}

export default Student;
