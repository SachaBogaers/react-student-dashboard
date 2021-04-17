const Checkbox = props => {
	const value = props.value
	const checked = props.checkedRating[value]
	return (
		<span>
			<input type="checkbox" onClick={props.handleCheckedRating} value={props.value} checked={checked} />{props.value}
		</span>

	)
}

export default Checkbox