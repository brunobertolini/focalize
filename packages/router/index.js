const glob = require('glob')
const {flattenDeep} = require('lodash')

const files = path => glob.sync(path).reduce((routes, file) => [...routes, ...require(file)], []) // eslint-disable-line import/no-dynamic-require

const register = (routes, server, middlewares) => routes.forEach(route => {
	const { method, path } = route
	const middleware = (middlewares) ? middlewares(route) : true

	if (middleware) {
		const params = [path, (middleware === true) ? route.handler : flattenDeep([middleware, route.handler])]
		server[method].apply(server, params)
	}
})

const load = (server, path, middlewares) => register(files(path), server, middlewares)

module.exports = {files, register, load}
