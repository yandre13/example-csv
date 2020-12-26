require('dotenv').config()
const app = require('./app'),
	c = console.log

app.listen(app.get('port'), () => c(`Server on port ${app.get('port')}`))
