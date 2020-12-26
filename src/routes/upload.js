const fs = require('fs'),
	path = require('path'),
	csv = require('csvtojson'),
	FormData = require('form-data'),
	fetch = require('node-fetch')

const uploadFile = async (file) => {
	return new Promise((resolve, reject) => {
		const ext = path.extname(file.name),
			validFormats = ['.csv'],
			newPath = path.resolve(__dirname, `../uploads/${file.name}`)
		if (validFormats.includes(ext)) {
			file.mv(newPath, (err) => {
				if (err) {
					reject({ err })
				} else {
					resolve({ uploaded: true, filePath: newPath })
				}
			})
		}
	})
}

const postUploadFile = async (req, res) => {
	try {
		const file = req.files.file
		const { uploaded, filePath } = await uploadFile(file)
		console.log(filePath)
		//Json
		const json = await csv({ delimiter: ';' }).fromFile(filePath)
		const forms = json.map((e) => {
			const form = new FormData()
			form.append('id', e.Identifier)
			form.append('username', e.Username)
			form.append('firstname', e.FirstName)
			return form
		})
		Promise.all(
			forms.map((f) => {
				fetch('http://localhost:3002/api/v1/test', { method: 'POST', body: f })
					.then((res) => res.json())
					.then(console.log)
			})
		)
	} catch (error) {
		return res.status(500).send({ error: error.message })
	}
}

const postTest = async (req, res) => {
	try {
		/* console.log(req.body) */
		setTimeout(() => {
			return res.status(200).send({ ok: true, user: req.body })
		}, 4000)
	} catch (error) {
		return res.status(500).send({ error: error.message })
	}
}

module.exports = { postUploadFile, postTest }
