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
		get: (path, handler) => {
			t.is(path, routes[1].path)
			t.is(handler, routes[1].handler)
		}
	}

	register(routes, server)
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
		get: (path, handler) => {
			t.is(path, routes[1].path)
			t.is(handler, routes[1].handler)
		}
	}

	load(server, './test/**/*routes.js')
})

test('register routes with middlwares', t => {
	const routes = [
		{method: 'post', path: '/one', handler: () => 'handler 1'},
		{method: 'get', path: '/home', handler: () => 'handler 1', remove: true}
	]

	const registered = []

	const server = {
		post: (path, handlers) => registered.push({path, handlers}),
		get: (path, handlers) => registered.push({path, handlers})
	}

	register(routes, server, route => {
		return route.remove ? false : () => 'middleware 1'
	})

	t.is(registered.length, 1)
	t.is(registered[0].path, routes[0].path)
	t.is(registered[0].handlers.length, 2)
	t.is(registered[0].handlers[0](), 'middleware 1')
	t.is(registered[0].handlers[1](), 'handler 1')
})

test('register routes with middlwares flatten handlers', t => {
	const routes = [
		{method: 'get', path: '/home', handler: [() => 'handler 1', () => 'handler 2'], auth: true}
	]

	const registered = []

	const server = {
		get: (path, handlers) => registered.push({path, handlers})
	}

	register(routes, server, () => [
		() => 'middleware 1',
		() => 'middleware 2'
	])

	t.is(registered.length, 1)
	t.is(registered[0].path, routes[0].path)
	t.is(registered[0].handlers.length, 4)
	t.is(registered[0].handlers[0](), 'middleware 1')
	t.is(registered[0].handlers[1](), 'middleware 2')
	t.is(registered[0].handlers[2](), 'handler 1')
	t.is(registered[0].handlers[3](), 'handler 2')
})
