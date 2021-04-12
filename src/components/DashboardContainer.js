
import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryTooltip } from 'victory';
import ChartComponent from './ChartComponent';
import { onlyUnique, getNames } from './utils'
import StudentCheckbox from './StudentCheckbox'

function DashboardContainer(props) {
	const data = props.data
	let chartData = data
	const exercises = data.map(item => item.exercise).filter(onlyUnique)
	const names = getNames(data)
	const students = props.students
	console.log("dashbaord", students)


	const getAverageData = () => {
		const onlySelectedStudents = students.filter(student => {
			if (student.isChecked) {
				return student.name
			}
		})
		const selectedNames = onlySelectedStudents.map(student => student.name)
		console.log(selectedNames.includes("Aranka"))
		const selectedData = data.filter((item => {
			return selectedNames.includes(item.name)
		}))
		const averageData = []
		exercises.forEach(exercise => {
			const filteredData = selectedData.filter(item => item.exercise === exercise)
			let averageDifficultyRating = filteredData.reduce((r, c) => r + c.difficultyRating, 0) / filteredData.length
			let averageEnjoyedRating = filteredData.reduce((r, c) => r + c.enjoyedRating, 0) / filteredData.length
			let label = exercise;
			if (label.length > 14) {
				label = label.substring(0, 14)
			}
			const exerciseData = {
				exercise: label,
				difficultyRating: averageDifficultyRating,
				enjoyedRating: averageEnjoyedRating
			}
			averageData.push(exerciseData)
		})
		return averageData;
	}

	// Checkbox on change = handleSelectedStudentChange => that function should be used in the parent (router) to change the state

	const averageData = getAverageData();
	console.log("average data", averageData)
	chartData = averageData


	return (
		<div className="DashboardContainer">
			<h1>Average ratings</h1>
			<form>
				{students.map(student => {
					return (<StudentCheckbox {...student} handleCheckedStudent={props.handleCheckedStudent} />)
				})}
			</form>
			<ChartComponent data={chartData} />

		</div>
	);

}

export default DashboardContainer;
