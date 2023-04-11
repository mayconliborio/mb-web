const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = 3000
const HOST = '0.0.0.0'

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT, HOST)
