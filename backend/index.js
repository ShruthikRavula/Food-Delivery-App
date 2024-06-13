const express = require('express')
const mongoDB = require('./db')
const cors = require('cors')
mongoDB();
const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})


const port = 5000

app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
