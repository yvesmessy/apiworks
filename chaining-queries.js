const mongoose = require('mongoose')
const { connection, Schema } = mongoose
mongoose.connect(
	'mongodb://localhost:27017/test'
).catch(console.error)

const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	age: Number,
})

const User = mongoose.model('User', UserSchema)

connection.once('connected', async () => {
	try {
		const user = await new User({
			firstName: 'John Quincy',
			lastName: 'Adams',
			age: 29,
		}).save()
		const findUser = await User.findOne()
		.where('firstName').equals('John')
		.where('age').lte(29)
		.select('lastName age')
		console.log(JSON.stringify(findUser, null, 4))
		await user.remove()
	} catch(error) {
		console.dir(error.message, { colors: true })
	} finally {
		await connection.close()
	}

})
