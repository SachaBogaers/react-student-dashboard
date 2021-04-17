import React from 'react'

export const StudentCheckBox = props => {
	return (
		<span>
			<input key={props.id} onChange={props.handleCheckedStudent} type="checkbox" checked={props.isChecked} value={props.name} /> {props.name}
		</span>
	)
}

export default StudentCheckBox