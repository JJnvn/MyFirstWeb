const express = require('express')
const app = express()

// const host = 'localhost'
const port = 8000

// path = '/'
app.get('/', (req, res) => {
  let user = {
    firstname: 'test',
    lastname: 'lastn',
    age: 14
  }
  // res.send('Hello world from port ' + port)
  res.json(user)
})

// start the server
app.listen(port, (req, res) => {
  console.log(`http server run at ${port}`)
})