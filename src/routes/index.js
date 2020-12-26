const router = require('express').Router(),
	{ postUploadFile, postTest } = require('./upload')

router.post('/upload', postUploadFile)
router.post('/test', postTest)

module.exports = router
