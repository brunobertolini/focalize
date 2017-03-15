import test from 'ava'
import {files, register, load} from './../index'

test('files routes from path', t => {
	const routes = files('./test/**/*routes.js')

	t.is(routes.length, 2)

	t.is(routes[0].method, 'post')
	t.is(routes[1].method, 'get')
})

test('register routes', t => {
	const routes = [
		{method: 'post', path: '/one', handler: x => x},
		{method: 'get', path: '/home', handler: x => x, auth: true}
	]

	const server = {
		post: (path, handler) => {
			t.is(path, routes[0].path)
			t.is(handler, routes[0].handler)
		},
		get: (path, auth, handler) => {
			t.is(path, routes[1].path)
			t.is(handler, routes[1].handler)
			t.is(auth, 'auth')
		}
	}

	register(routes, server, 'auth')
})

test('load routes', t => {
	const routes = [
		...require('./fixtures/one.routes'),
		...require('./fixtures/routes')
	]

	const server = {
		post: (path, handler) => {
			t.is(path, routes[0].path)
			t.is(handler, routes[0].handler)
		},
		get: (path, auth, handler) => {
			t.is(path, routes[1].path)
			t.is(handler, routes[1].handler)
			t.is(auth, 'auth')
		}
	}

	load(server, './test/**/*routes.js', 'auth')
})
