
import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryTooltip } from 'victory';
import { onlyUnique } from './utils'

function ChartComponent(props) {
	const data = props.data
	console.log("chart component", data)


	return (
		<VictoryChart
			className="VictoryChart"
			domainPadding={5} style={{
				parent: {
					// border: "1px solid black",
					height: "80vh",
				}
			}}
			padding={{ top: 0, bottom: 40, left: 40, right: 20 }}
		>
			<VictoryGroup
				offset={3}
			>
				<VictoryBar
					data={data}
					x="exercise"
					y="difficultyRating"
					style={{ data: { fill: "yellow", } }}
				/>
				<VictoryBar
					data={data}
					x="exercise"
					y="enjoyedRating"
					style={{ data: { fill: "tomato" } }}
				/>
			</VictoryGroup>
			<VictoryAxis
				style={{
					parent: {
						border: "1px solid black"
					},
					tickLabels: {
						fontSize: ({ text }) => text.length > 10 ? 3 : 4,
						padding: 1
					},
				}
				}
				label="Exercise"
				tickLabelComponent={<VictoryLabel angle={70} textAnchor={{ type: "start" }} verticalAnchor={{ type: "middle" }} />}
			/>


			{/* labels: { fontSize: ({ text }) => text.length > 10 ? 8 : 12 } */}
			<VictoryAxis
				dependentAxis
				orientation="left"
				style={{ tickLabels: { fontSize: 10 } }}
				label="Rating"

			/>
		</VictoryChart>
	);

}

export default ChartComponent;
