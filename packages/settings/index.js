const fs = require('fs')
const _ = require('lodash')
const dotenv = require('dotenv')

let settings = {}

const file = path => dotenv.parse(fs.readFileSync(path))

const parse = vars => _.reduce(vars, (arr, value, key) => {
	const keys = key.toLowerCase().split('_')
	const env = (keys.length > 1) ? {[keys.shift()]: {[keys.join('_')]: value}} : {[keys[0]]: value}
	return _.defaultsDeep(arr, env)
}, {})

const set = obj => {
	settings = obj
	return settings
}

const get = key => (key) ? settings[key] : settings

const load = path => set(parse(file(path)))

module.exports = {file, parse, set, get, load}
