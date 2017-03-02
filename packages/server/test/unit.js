import test from 'ava'
import server from './../index'

server.listen = (port, host, handler) => ({port, host, handler})

test('start default', t => {
	const {port, host} = server.start()

	t.is(port, 9901)
	t.is(host, '0.0.0.0')
})

test('start whit params', t => {
	const {port, host} = server.start(9902, '0.1.2.3')

	t.is(port, 9902)
	t.is(host, '0.1.2.3')
})
