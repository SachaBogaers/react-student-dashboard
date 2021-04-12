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
	let { topicId } = useParams();
	let name = topicId.charAt(0).toUpperCase() + topicId.slice(1);
	const studentInfo = props.students.filter(student => student.name === name)[0]

	// filter data by value name, which is same as name
	// use that data in the chartcomponent
	const getStudentData = (name) => {
		const studentData = data.filter(function (e) {
			return e.name === name
		})
		return studentData;
	}

	const studentData = getStudentData(name);

	return (

		<header className="Student">
			<h1>{name}</h1>
			{studentInfo && <img src={studentInfo.image} />}
			<ChartComponent data={studentData} />
		</header>
	);
}

export default Student;
