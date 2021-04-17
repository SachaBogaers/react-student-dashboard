
import React from 'react'
import BarChart from './BarChart';
import LineChart from './LineChart'
import { onlyUnique } from './utils'
import StudentCheckbox from './StudentCheckbox'
import Checkbox from './Checkbox';

function DashboardContainer(props) {
	const data = props.data
	let chartData = data
	const exercises = data.map(item => item.exercise).filter(onlyUnique)
	const students = props.students

	const getAverageData = () => {
		// Use only the selected students to generate the average data
		const onlySelectedStudents = students.filter(student => student.isChecked)
		const selectedNames = onlySelectedStudents.map(student => student.name)
		const selectedData = data.filter(item => selectedNames.includes(item.name))
		const averageData = []
		// Generate object with average ratings
		exercises.forEach(exercise => {
			const filteredData = selectedData.filter(item => item.exercise === exercise)
			let label = exercise;
			if (label.length > 14) {
				label = label.substring(0, 14)
			}
			const exerciseData = {
				exercise: label
			}
			// Only generate the average rating if checkbox for this rating has been checked
			if (props.checkedRating.difficulty) {
				let averageDifficultyRating = Math.round((filteredData.reduce((r, c) => r + c.difficultyRating, 0) / filteredData.length) * 10) / 10
				exerciseData.difficultyRating = averageDifficultyRating
			}
			if (props.checkedRating.fun) {
				let averageEnjoyedRating = Math.round((filteredData.reduce((r, c) => r + c.enjoyedRating, 0) / filteredData.length) * 10) / 10
				exerciseData.enjoyedRating = averageEnjoyedRating
			}
			averageData.push(exerciseData)
		})
		return averageData;
	}

	const averageData = getAverageData();

	// Sort data based on the selected value
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
			default:
				return dataCopy;
		}
	}

	const sortedData = sortData(averageData, props.sortingType)
	chartData = sortedData


	return (
		<div className="DashboardContainer">
			<h1>Average ratings</h1>
			<div className="dataSelectors">
				<h2>Select how you want the data to be displayed</h2>
				<form>
					{students.map(student => {
						return (<StudentCheckbox {...student} handleCheckedStudent={props.handleCheckedStudent} key={student.name} />)
					})}
				</form>
				<form className="ratingSelector">Show rating:
				<Checkbox name="Difficulty" value="difficulty" checkedRating={props.checkedRating} handleCheckedRating={props.handleCheckedRating} />
					<Checkbox name="Fun" value="fun" checkedRating={props.checkedRating} handleCheckedRating={props.handleCheckedRating} />
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
				<form >
					<input type="radio" id="barChart" name="chart" value="bar" checked={props.selectedChartType === "bar"} onChange={props.handleSelectedChartTypeChange} />
					<label htmlFor="barChart">Bar chart</label>
					<input type="radio" id="lineChart" name="chart" value="line" checked={props.selectedChartType === "line"} onChange={props.handleSelectedChartTypeChange} />
					<label htmlFor="lineChart">Line chart</label>
				</form>
			</div>
			{props.selectedChartType === "bar" && <BarChart data={chartData} sortingCheck={props.sortingCheck} />}
			{props.selectedChartType === "line" && <LineChart data={chartData} sortingCheck={props.sortingCheck} />}
		</div >
	);

}

export default DashboardContainer;
