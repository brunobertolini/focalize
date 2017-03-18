const server = require('focalize-server')
const settings = require('focalize-settings')
const router = require('focalize-router')
const database = require('focalize-database')

module.exports = {
	server,
	settings,
	router: router.load,
	database: database.connect
}
