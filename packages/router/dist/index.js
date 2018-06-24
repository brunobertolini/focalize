'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var glob = require('glob');

var _require = require('lodash'),
    flattenDeep = _require.flattenDeep;

var nodePath = process.env.NODE_PATH || '.';

var files = function files(path) {
	return glob.sync(nodePath + '/' + path).reduce(function (routes, file) {
		return [].concat((0, _toConsumableArray3.default)(routes), (0, _toConsumableArray3.default)(require(file.replace(process.env.NODE_PATH + '/', ''))));
	}, []);
};

var register = function register(routes, server, middlewares) {
	return routes.forEach(function (route) {
		var method = route.method,
		    path = route.path;

		var middleware = middlewares ? middlewares(route) : true;

		if (middleware) {
			var params = [path, middleware === true ? route.handler : flattenDeep([middleware, route.handler])];
			server[method].apply(server, params);
		}
	});
};

var load = function load(server, path, middlewares) {
	return register(files(path), server, middlewares);
};

module.exports = { files: files, register: register, load: load };