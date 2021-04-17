import { useParams } from "react-router-dom";
import BarChart from "./BarChart";

function Student(props) {
	const data = props.data
	let { topicId } = useParams();
	let name = topicId.charAt(0).toUpperCase() + topicId.slice(1);
	const studentInfo = props.students.filter(student => student.name === name)[0]
	const getStudentData = (name) => {
		const studentData = data.filter(function (e) {
			return e.name === name
		})
		return studentData;
	}

	const studentData = getStudentData(name);
	console.log(studentData)
	let averageDifficultyRating = Math.round((studentData.reduce((r, c) => r + c.difficultyRating, 0) / studentData.length) * 10) / 10
	let averageEnjoyedRating = Math.round((studentData.reduce((r, c) => r + c.enjoyedRating, 0) / studentData.length) * 10) / 10
	studentData.forEach(item => {
		if (item.exercise.length > 14) {
			item.exercise = item.exercise.substring(0, 14)
		}
	})

	return (
		<div className="Student" >
			{ studentInfo && <div className="studentNameImg"><h1>{name} {studentInfo.lastName}</h1><img src={studentInfo.image} alt={`${name}'s face`} /></div>}
			{ studentInfo && <div className="studentContactInfo"><h2>About {name}: </h2>
				<p>
					Email: {studentInfo.email} <br></br>
				Phone: {studentInfo.phone}<br></br>
				Age: {studentInfo.age}<br></br>
				Average difficulty rating: {averageDifficultyRating}<br></br>
				Average fun rating: {averageEnjoyedRating}
				</p>
			</div>}
			<BarChart data={studentData} />
		</div >
	);
}

export default Student;
