import test from 'ava'
import configLoader from './../index'

test('load .env file', t => {
	const settings = configLoader('./test/.env')

	t.is(settings.test, 'test')
	t.is(settings.obj.a, 'a')
	t.is(settings.another.a_b, 'b')
})

test('load get loaded settings', t => {
	const settings = configLoader()

	t.is(settings.test, 'test')
	t.is(settings.obj.a, 'a')
	t.is(settings.another.a_b, 'b')
})
