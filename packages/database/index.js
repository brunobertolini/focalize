const mongoose = require('mongoose')
const bluebird = require('bluebird')

mongoose.Promise = bluebird

const isFalsy = val => !val || val === 'false'

const credentials = (user, password) =>
  [user, password].some(isFalsy) ? '' : `${user}:${password}@`

const url = ({host, port, db, user, password}) =>
  `mongodb://${credentials(user, password)}${host}:${port}/${db}`

const handler = err => {
	if (err) {
		throw err
	}
}

const connect = settings => mongoose.connect(url(settings), handler)

module.exports = {credentials, url, connect}
