import React from "react";
import {
	NavLink
} from "react-router-dom";

export default function MainNav() {
	return (
		<nav className="MainNav">
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
		</nav>

	)
}