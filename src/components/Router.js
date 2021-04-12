import Papa from 'papaparse';
import rawStudentData from '../data/student_data.csv';
import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from "react-router-dom";
import DashboardContainer from './DashboardContainer'
import AboutPage from './AboutPage'
import AllStudents from './AllStudents'
import { onlyUnique, getNames } from './utils'

export default function App() {

	// Getting student data and setting it to the state
	const [data, setData] = useState([])
	const [students, setStudents] = useState([])

	const getData = () => {
		Papa.parse(rawStudentData, {
			download: true,
			header: true,
			dynamicTyping: true,
			delimiter: ',',
			skipEmptyLines: true,
			complete: function (results) {
				setData(results.data)
				const names = getNames(results.data)
				const initialSelectedStudents = initializeSelectedStudents(names)
				setStudents(initialSelectedStudents)
			}
		})
	}

	useEffect(() => {
		getData();
	}, [])

	const initializeSelectedStudents = (names) => {
		let i = 1
		const selectedStudents = []
		names.forEach(name => {
			const image = `https://robohash.org/${name}?set=set5`
			const student = {
				id: i,
				name: name,
				isChecked: true,
				image: image
			}
			selectedStudents.push(student)
			i++;
		})
		return selectedStudents
	}


	const handleCheckedStudent = (event) => {
		// Find the student that was checked or unchecked in state and get index
		const checkedStudent = students.find(student => student.name === event.target.value)
		const checkedStudentIndex = students.indexOf(checkedStudent)
		// Make copy of selected student object, as to not change state directly
		const copyCheckedStudent = { ...checkedStudent }
		// Change checked value of selected student
		copyCheckedStudent.isChecked = !copyCheckedStudent.isChecked
		// Make a new array of selected students, insert changed student object, set state with new array of selected students
		const newCheckedStudents = [...students]
		newCheckedStudents[checkedStudentIndex] = copyCheckedStudent
		setStudents(newCheckedStudents)
	}

	return (
		<Router>
			<div className="router">
				<nav className="main-nav">
					<ul className="main-nav--list">
						<li className="main-nav--list--item">
							<NavLink to="/">Home</NavLink >
						</li>
						<li className="main-nav--list--item">
							<NavLink to="/students">Students</NavLink >
						</li>
						<li className="main-nav--list--item">
							<NavLink to="/about">About</NavLink >
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/students">
						<AllStudents data={data} students={students} />
					</Route>
					<Route path="/about">
						<AboutPage />
					</Route>
					<Route path="/">
						<DashboardContainer data={data} students={students} handleCheckedStudent={handleCheckedStudent} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}