const express = require('express'),
	router = require('./routes'),
	cors = require('cors'),
	fileUpload = require('express-fileupload'),
	app = express()

//Config
app
	.set('port', process.env.PORT || 3002)
	.use(cors())
	.use(express.json())
	.use(express.urlencoded({ extended: false }))
	.use(fileUpload())
	.use('/api/v1', router)

module.exports = app
