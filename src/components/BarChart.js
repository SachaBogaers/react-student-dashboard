import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryLegend } from 'victory';

function BarChart(props) {
	const data = props.data
	return (
		<VictoryChart
			className="VictoryChart"
			domainPadding={5} style={{
				parent: {
					height: "80vh",
				}
			}}
			padding={{ top: 0, bottom: 40, left: 40, right: 20 }}
			domain={{ y: [0, 5.5] }}
		>
			<VictoryLegend x={175} y={5}
				orientation="horizontal"
				gutter={20}
				style={{ border: { stroke: "black" }, labels: { fontSize: 10 } }}
				data={[
					{ name: "Difficulty", symbol: { fill: "#FF4A1C" } },
					{ name: "Fun", symbol: { fill: "#3E78B2" } },
				]}
			/>
			<VictoryGroup
				offset={3}
			>
				<VictoryBar
					data={data}
					x="exercise"
					y="enjoyedRating"
					style={{ data: { fill: "#3E78B2" } }}
				/>
				<VictoryBar
					data={data}
					x="exercise"
					y="difficultyRating"
					style={{ data: { fill: "#FF4A1C", } }}
				/>

			</VictoryGroup>
			<VictoryAxis
				style={{
					parent: {
						border: "1px solid black"
					},
					tickLabels: {
						fontSize: ({ text }) => text.length > 10 ? 4 : 5,
						padding: 1
					},
				}
				}
				label="Exercise"
				tickLabelComponent={<VictoryLabel angle={70} textAnchor="start" verticalAnchor="middle" />}
			/>
			<VictoryAxis
				dependentAxis
				orientation="left"
				style={{ tickLabels: { fontSize: 10 } }}
				label="Rating"

			/>

		</VictoryChart>
	);

}

export default BarChart;
