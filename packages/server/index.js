// Base libs
const restify = require('restify')
const cors = require('cors')

// Create server
const server = restify.createServer()

server.use(cors())
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser({mapParams: true}))
server.pre(restify.pre.sanitizePath())

server.start = (port = 9901, host = '0.0.0.0') =>
	server.listen(port, host, () =>
		console.log(`Server up, listening at ${host}:${port}`))

module.exports = server
