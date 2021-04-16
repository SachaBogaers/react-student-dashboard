
import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryTooltip } from 'victory';
import BarChart from './BarChart';
import LineChart from './LineChart'
import { onlyUnique, getNames } from './utils'
import StudentCheckbox from './StudentCheckbox'
import Checkbox from './Checkbox'
import Exercise from './Exercise'

function DashboardContainer(props) {
	const data = props.data
	let chartData = data
	const exercises = data.map(item => item.exercise).filter(onlyUnique)
	const names = getNames(data)
	const students = props.students

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
	chartData = averageData

	const sortData = (sortingData, sortingType) => {
		const dataCopy = [...sortingData]
		switch (sortingType) {
			case "funLow":
				return dataCopy.sort((a, b) => (a.enjoyedRating > b.enjoyedRating) ? 1 : ((b.enjoyedRating > a.enjoyedRating) ? -1 : 0))
			case "funHigh":
				return dataCopy.sort((a, b) => (a.enjoyedRating < b.enjoyedRating) ? 1 : ((b.enjoyedRating < a.enjoyedRating) ? -1 : 0))
			case "difficultyLow":
				return dataCopy.sort((a, b) => (a.difficultyRating > b.difficultyRating) ? 1 : ((b.difficultyRating > a.difficultyRating) ? -1 : 0))
			case "difficultyHigh":
				return dataCopy.sort((a, b) => (a.difficultyRating < b.difficultyRating) ? 1 : ((b.difficultyRating < a.difficultyRating) ? -1 : 0))
			case "exercise":
				return dataCopy.sort((a, b) => (a.exercise > b.exercise) ? 1 : ((b.exercise > a.exercise) ? -1 : 0))
		}
	}

	const sortedData = sortData(averageData, props.sortingType)
	chartData = sortedData


	return (
		<div className="DashboardContainer">
			<h1>Average ratings</h1>
			<form>
				{students.map(student => {
					return (<StudentCheckbox {...student} handleCheckedStudent={props.handleCheckedStudent} />)
				})}
			</form>
			<form>Sort data:
				<select value={props.sortingType} onChange={props.handleSortingTypeChange}>
					<option value="difficultyLow">By difficulty, lowest first</option>
					<option value="difficultyHigh">By difficulty, highest first</option>
					<option value="funLow">By fun rating, lowest first</option>
					<option value="funHigh">By fun rating, highest first</option>
					<option value="exercise">By exercise</option>
				</select>
			</form>

			<form onChange={props.handleSelectedChartTypeChange}>
				<input type="radio" id="barChart" name="chart" value="bar" checked={props.selectedChartType === "bar"} />
				<label for="barChart">Bar chart</label>
				<input type="radio" id="lineChart" name="chart" value="line" checked={props.selectedChartType === "line"} />
				<label for="lineChart">Line chart</label>
			</form>
			{props.selectedChartType === "bar" && <BarChart data={chartData} sortingCheck={props.sortingCheck} />}
			{props.selectedChartType === "line" && <LineChart data={chartData} sortingCheck={props.sortingCheck} />}
		</div>
	);

}

export default DashboardContainer;
