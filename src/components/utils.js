function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

const getNames = (data) => data.map(person => person.name).filter(onlyUnique);
const getExercises = (data) => data.map(item => item.exercise).filter(onlyUnique);

function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)];
}

const generateEmail = (firstName, lastName) => {
	console.log("generating email", firstName, lastName)
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

export { onlyUnique, getNames, getExercises, pickRandom, generateEmail, generatePhoneNumber, randomNumber }