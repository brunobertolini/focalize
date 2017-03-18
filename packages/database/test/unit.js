import test from 'ava'
import {credentials, url} from './../index'

test('get credentials piece of database url', t => {
	const url = credentials('a', 'b')

	t.is(url, 'a:b@')
})

test('get empty credentials when user is false', t => {
	const url = credentials('a', false)

	t.is(url, '')
})

test('get empty credentials when user is falsy', t => {
	const url = credentials('false', 'b')

	t.is(url, '')
})

test('get empty credentials when user is null', t => {
	const url = credentials(null, 'b')

	t.is(url, '')
})

test('get empty credentials when password is false', t => {
	const url = credentials('a', false)

	t.is(url, '')
})

test('get empty credentials when password is falsy', t => {
	const url = credentials('a', 'false')

	t.is(url, '')
})

test('get empty credentials when password is null', t => {
	const url = credentials('a', null)

	t.is(url, '')
})

test('get database url', t => {
	const dbUrl = url({
		host: 'host',
		port: 'port',
		db: 'db',
		user: 'user',
		password: 'pass'
	})

	t.is(dbUrl, 'mongodb://user:pass@host:port/db')
})
