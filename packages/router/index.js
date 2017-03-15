const glob = require('glob')

const files = path => glob.sync(path).reduce((routes, file) => [...routes, ...require(file)], []) // eslint-disable-line import/no-dynamic-require

const register = (routes, server, auth) => routes.forEach(route => {
	const params = [route.path]

	if (route.auth && auth) {
		params.push(auth)
	}

	params.push(route.handler)

	server[route.method].apply(server, params)
})

const load = (server, path, auth) => register(files(path), server, auth)

module.exports = {files, register, load}
