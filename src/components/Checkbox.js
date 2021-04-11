
import React from 'react'

export const CheckBox = props => {
	return (
		<span>
			<input key={props.id} onChange={props.handleCheckedStudent} type="checkbox" checked={props.isChecked} value={props.name} /> {props.name}
		</span>
	)
}

export default CheckBox