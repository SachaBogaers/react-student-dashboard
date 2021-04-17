import React from "react";
import {
	Link,
} from "react-router-dom";

function Studentlist(props) {
	const names = props.names
	const url = props.url
	return (
		<ul className="studentList">
			{names.map(name => {
				return (<li key={name}>
					<Link to={`${url}/${name.toLowerCase()}`} key={name}>{name}</Link>
				</li>)
			})}
		</ul>
	);
}

export default Studentlist;

