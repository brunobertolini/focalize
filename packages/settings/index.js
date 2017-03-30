const fs = require('fs')
const dotenv = require('dotenv')
const {reduce, defaultsDeep} = require('lodash')

let settings = {}

const required = path => Object.keys(dotenv.parse(fs.readFileSync(path || '.env.example')))

const check = required => required.reduce((obj, key) => {
	if (!process.env[key]) {
		throw new Error(`Missing enviroment variable: ${key}`)
	}

	return Object.assign(obj, {[key]: process.env[key]})
}, {})

const parse = vars => reduce(vars, (arr, value, key) => {
	const keys = key.toLowerCase().split('_')
	const env = (keys.length > 1) ? {[keys.shift()]: {[keys.join('_')]: value}} : {[keys[0]]: value}

	return defaultsDeep(arr, env)
}, {})

const set = obj => {
	settings = obj
	return settings
}

const get = key => (key) ? settings[key] : settings

const load = path => set(parse(check(required(path))))

module.exports = {required, check, parse, set, get, load}
