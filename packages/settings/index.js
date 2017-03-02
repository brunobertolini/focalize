const fs = require('fs')
const _ = require('lodash')
const dotenv = require('dotenv')

let settings = {}

const load = (path) => {
		if (!path) {
			return settings;
		}

    const envRef = fs.readFileSync(path)
    const envVars = dotenv.parse(envRef)

    _.forEach(envVars, (value, key) => {
        let keys = key.toLowerCase().split('_')

        if (keys.length > 1) {
            settings[keys[0]] = settings[keys[0]] || {}
            settings[keys.shift()][keys.join('_')] = value
        } else {
            settings[keys[0]] = value
        }
    })

    return settings
}

module.exports = load;
