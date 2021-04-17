import React from "react";
import {
	Switch,
	Route,
	useRouteMatch
} from "react-router-dom";
import Student from './Student'
import StudentList from './StudentList'
import { getNames } from './utils'


function StudentsPage(props) {
	const data = props.data
	const names = getNames(data);
	let { path, url } = useRouteMatch();
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
						students={props.students}
					/>
				</Route>
			</Switch>
		</main>

	);
}



export default StudentsPage;
