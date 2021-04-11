function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

const getNames = (data) => data.map(person => person.name).filter(onlyUnique);

export { onlyUnique, getNames }