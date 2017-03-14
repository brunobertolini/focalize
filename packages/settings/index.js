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

const setSettings = obj => {
	settings = obj
	return settings
}

const load = path => setSettings(parse(file(path)))

const getSettings = key => (key) ? settings[key] : settings

module.exports = {file, parse, load, getSettings}
