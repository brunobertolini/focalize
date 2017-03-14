import test from 'ava'
import {file, parse, load, getSettings} from './../index'

test('load file', t => {
	const settings = file('./test/.env')

	t.is(settings.TEST, 'test')
	t.is(settings.OBJ_A, 'a')
	t.is(settings.ANOTHER_A_B, 'b')
})

test('parse loaded file', t => {
	const settings = {
		TEST: 'test',
		OBJ_A: 'a',
		OBJ_B: 'b',
		ANOTHER_A_B: 'b'
	}

	const result = parse(settings)

	t.is(result.test, 'test')
	t.is(result.obj.a, 'a')
	t.is(result.obj.b, 'b')
	t.is(result.another.a_b, 'b')
})

test('load .env file', t => {
	const settings = load('./test/.env')

	t.is(settings.test, 'test')
	t.is(settings.obj.a, 'a')
	t.is(settings.another.a_b, 'b')
})

test('load get loaded settings', t => {
	const settings = getSettings()

	t.is(settings.test, 'test')
	t.is(settings.obj.a, 'a')
	t.is(settings.another.a_b, 'b')
})
