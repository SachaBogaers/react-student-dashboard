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

export default function App() {

	// Getting student data and setting it to the state
	const [data, setData] = useState([])

	const getData = () => {
		Papa.parse(rawStudentData, {
			download: true,
			header: true,
			dynamicTyping: true,
			delimiter: ',',
			skipEmptyLines: true,
			complete: function (results) {
				setData(results.data)
			}
		})
	}

	useEffect(() => {
		getData();
	}, [])



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
						<AllStudents data={data} />
					</Route>
					<Route path="/about">
						<AboutPage />
					</Route>
					<Route path="/">
						<DashboardContainer data={data} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}