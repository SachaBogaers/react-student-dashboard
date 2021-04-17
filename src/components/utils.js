import lastNames from '../data/lastNames.json'

const onlyUnique = (value, index, self) => self.indexOf(value) === index;
const getNames = (data) => data.map(person => person.name).filter(onlyUnique);
const getExercises = (data) => data.map(item => item.exercise).filter(onlyUnique);
const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]


const generateEmail = (firstName, lastName) => {
	firstName = firstName.toLowerCase()
	lastName = lastName.toLowerCase()
	const providers = ['hotmail.com', 'hotmail.nl', 'gmail.com', 'live.com', 'mail.com', 'outlook.com', 'yahoo.com']
	const formats = [`${firstName}.${lastName}`, `${firstName.charAt(0)}.${lastName}`, `${firstName}_${lastName}`, `${firstName}${lastName}`]
	const format = pickRandom(formats);
	const provider = pickRandom(providers);
	const email = `${format}@${provider}`
	return email
}

const randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
}

const generatePhoneNumber = () => {
	const number = `06-${Math.floor(Math.random() * 89999999 + 100000)}`
	return number

}

const initializeSelectedStudents = (names) => {
	let i = 1
	const selectedStudents = []
	names.forEach(name => {
		const image = `https://robohash.org/${i}?set=set5`
		const lastName = pickRandom(lastNames.data)
		const email = generateEmail(name, lastName)
		const phone = generatePhoneNumber()
		const age = randomNumber(18, 55)
		const student = {
			id: i,
			name: name,
			lastName: lastName,
			isChecked: true,
			image: image,
			email: email,
			phone: phone,
			age: age
		}
		selectedStudents.push(student)
		i++;
	})
	return selectedStudents
}

export {
	onlyUnique,
	getNames,
	getExercises,
	initializeSelectedStudents
}