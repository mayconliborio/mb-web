const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const router = require('./routes')

const app = express()
const PORT = 3000
const HOST = '0.0.0.0'

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cors())
app.use(bodyParser.json())
app.use(router)

app.listen(PORT, HOST)
