import Papa from 'papaparse';
import rawStudentData from '../data/student_data.csv';
import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import DashboardContainer from './DashboardContainer'
import AboutPage from './AboutPage'
import StudentsPage from './StudentsPage'
import { getNames, initializeSelectedStudents } from './utils'

import AllExercises from './AllExercises'
import MainNav from './MainNav'
import Footer from './Footer'

export default function App() {

	// Getting student data and setting it to the state
	const [data, setData] = useState([])
	const [students, setStudents] = useState([])
	const [selectedChartType, setSelectedChartType] = useState("bar")
	const [sortingType, setSortingType] = useState("exercise")

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





	const handleSelectedChartTypeChange = (event) => {
		// Set chart type in state to the selected value
		const value = event.target.value
		setSelectedChartType(value)
	}

	const handleSortingTypeChange = (event) => {
		// Set sorting type in state to the selected value
		const value = event.target.value
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
			<div className="Router">
				<MainNav />
				<Switch>
					<Route path="/students">
						<StudentsPage data={data} students={students} />
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
				<Footer />
			</div>
		</Router>
	);
}