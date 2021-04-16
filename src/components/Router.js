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
import { onlyUnique, getNames, pickRandom, generateEmail, generatePhoneNumber, randomNumber } from './utils'
import lastNames from './lastNames.json'
import { Selection } from 'victory';
import AllExercises from './AllExercises'

export default function App() {

	// Getting student data and setting it to the state
	const [data, setData] = useState([])
	const [students, setStudents] = useState([])
	const [selectedChartType, setSelectedChartType] = useState("bar")
	const [sortingType, setSortingType] = useState("exercise")
	let randomLastName = ""

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
			const image = `https://robohash.org/${i}?set=set5`
			const lastName = pickRandom(lastNames.data)
			const email = generateEmail(name, lastName)
			const phone = generatePhoneNumber()
			const age = randomNumber(18, 55)
			console.log("email", email)
			const student = {
				id: i,
				name: name,
				lastName: lastName,
				isChecked: true,
				image: image,
				email: email,
				phone: phone,
				age: age
			}
			selectedStudents.push(student)
			i++;
		})
		return selectedStudents
	}


	const handleSelectedChartTypeChange = (event) => {
		const value = event.target.value
		setSelectedChartType(value)
	}

	const handleSortingTypeChange = (event) => {
		const value = event.target.value
		console.log(value)
		setSortingType(value)
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
							<NavLink to="/exercises">Exercises</NavLink >
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
					<Route path="/exercises">
						<AllExercises data={data} />
					</Route>
					<Route path="/about">
						<AboutPage />
					</Route>
					<Route path="/">
						<DashboardContainer
							data={data}
							students={students}
							handleCheckedStudent={handleCheckedStudent}
							handleSelectedChartTypeChange={handleSelectedChartTypeChange}
							selectedChartType={selectedChartType}
							handleSortingTypeChange={handleSortingTypeChange}
							sortingType={sortingType} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}