import test from 'ava'
import dotenv from 'dotenv'
import settings from './../index'

test('load file', t => {
	const required = settings.required('./test/fixtures/env')
	t.deepEqual(required, ['TEST', 'OBJ_A', 'ANOTHER_A_B'])
})

test('parse loaded file', t => {
	const result = settings.parse({
		TEST: 'test',
		OBJ_A: 'a',
		OBJ_B: 'b',
		ANOTHER_A_B: 'b'
	})

	t.is(result.test, 'test')
	t.is(result.obj.a, 'a')
	t.is(result.obj.b, 'b')
	t.is(result.another.a_b, 'b')
})

test('check throws error when var not exists in env', t => {
	const error = t.throws(() => {
		settings.check(['A', 'B'])
	}, Error);

	t.is(error.message, 'Missing enviroment variable: A');
})

test('check var exists env', t => {
	process.env.A = 'b'
	process.env.B = 'a'

	const result = settings.check(['A', 'B'])
	t.deepEqual(result, {A: 'b', B: 'a'})
})

test('load .env file', t => {
	dotenv.config({path: './test/fixtures/env'})

	const result = settings.load('./test/fixtures/env')

	t.is(result.test, 'test')
	t.is(result.obj.a, 'a')
	t.is(result.another.a_b, 'b')
})

test('load get loaded settings', t => {
	const result = settings.get()

	t.is(result.test, 'test')
	t.is(result.obj.a, 'a')
	t.is(result.another.a_b, 'b')
})
