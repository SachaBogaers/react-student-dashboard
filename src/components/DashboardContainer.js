
import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryTooltip } from 'victory';
import ChartComponent from './ChartComponent';
import { onlyUnique } from './utils'

function DashboardContainer(props) {
	const data = props.data
	console.log(data)
	let chartData = data


	const exercises = data.map(item => item.exercise).filter(onlyUnique)


	// // get array of objects with {
	// 	//exercise: blabla,
	// 	enjoyedRating: blabla,
	// 	difficultyrating: blabla
	// }

	const getAverageData = () => {
		const averageData = []

		console.log(exercises)
		exercises.forEach(exercise => {
			const filteredData = data.filter(item => item.exercise === exercise)
			console.log("Filtered", filteredData)
			let averageDifficultyRating = filteredData.reduce((r, c) => r + c.difficultyRating, 0) / filteredData.length
			let averageEnjoyedRating = filteredData.reduce((r, c) => r + c.enjoyedRating, 0) / filteredData.length
			let label = exercise;
			if (label.length > 14) {
				label = label.substring(0, 14)
			}
			console.log("Label", label)
			console.log(averageDifficultyRating, averageEnjoyedRating, label)
			const exerciseData = {
				exercise: label,
				difficultyRating: averageDifficultyRating,
				enjoyedRating: averageEnjoyedRating
			}
			averageData.push(exerciseData)
		})
		return averageData;
	}

	const averageData = getAverageData();
	console.log(averageData)
	chartData = averageData


	return (
		<div className="DashboardContainer">
			<h1>Average ratings</h1>
			<ChartComponent data={chartData} />
		</div>
	);

}

export default DashboardContainer;
