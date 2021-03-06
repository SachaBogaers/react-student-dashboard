import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../logo.png'

export default function MainNav() {
	return (
		<nav className="MainNav">
			<NavLink to="/"><img className="logoImg" alt="black icon of a bar chart" src={logo} /></NavLink >
			<NavLink to="/"><h1>Student rating dashboard</h1></NavLink >
			<ul className="MainNav--list">
				<li className="MainNav--list--item">
					<NavLink to="/">Home</NavLink >
				</li>
				<li className="MainNav--list--item">
					<NavLink to="/students">Students</NavLink >
				</li>
				<li className="MainNav--list--item">
					<NavLink to="/exercises">Exercises</NavLink >
				</li>
				<li className="MainNav--list--item">
					<NavLink to="/about">About</NavLink >
				</li>
			</ul>
		</nav >
	)
}