const server = require('focalize-server')
const settings = require('focalize-settings')
const router = require('focalize-router')

module.exports = {
	server,
	settings,
	router: router.load
}
