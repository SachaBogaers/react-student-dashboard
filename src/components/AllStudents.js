import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";
import Student from './Student'
import StudentList from './StudentList'
import { onlyUnique, getNames } from './utils'


function StudentsPage(props) {
	const data = props.data
	const names = getNames(data);
	console.log("Student page names", names)
	let { path, url } = useRouteMatch();
	console.log("Students page")
	return (
		<main className="StudentsPage">
			<h1>Students</h1>
			<h2>Select a student to see their profile and how they rated each exercise</h2>
			<StudentList names={names} path={path} url={url} />

			<Switch>
				<Route path={`${path}/:topicId`}>
					<Student
						name={url}
						data={data}
					/>
				</Route>
			</Switch>
		</main>

	);
}



export default StudentsPage;
