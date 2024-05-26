const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(bodyparser.json())

const users = []
let counter = 1

// const host = 'localhost'
const port = 8000

// path = '/'
app.get('/users', (req, res) => {
  res.send(users)
})

app.post('/user', (req, res) => {
  let user = req.body
  user.id = counter
  counter += 1
  users.push(user)
  res.json({
    message: 'add ok',
    user: user
  })
})

app.put('/user/:id', (req, res) => {
  let id = req.params.id
  let updateUser = req.body

  let selectedIndex = users.findIndex(user => user.id == id)
  // users[selectedIndex] = updateUser // this will delete the id key
  users[selectedIndex].firstName = updateUser.firstName || users[selectedIndex].firstName
  users[selectedIndex].lastName = updateUser.lastName || users[selectedIndex].lastNametName
  // res.send(selectedIndex + '')
  res.json({
    message: 'update user complete',
    data: {
      user: updateUser,
      indexUpdate: selectedIndex
    }
  })
})

app.patch('/user/:id', (req, res) => {
  let id = req.params.id
  let updateUser = req.body

  let selectedIndex = users.findIndex(user => user.id == id)
  if(updateUser.firstName){
    users[selectedIndex].firstName = updateUser.firstName
  }
  if(updateUser.lastNamestName){
    users[selectedIndex].lastName = updateUser.lastNamestName
  }

  res.json({
    message: 'patch user complete',
    data: {
      user: updateUser,
      indexUpdate: selectedIndex
    }
  })
})

app.delete('/user/:id', (req, res) => {
  let id = req.params.id

  let selectedIndex = users.findIndex(user => user.id == id)

  // delete users[selectedIndex]
  users.splice(selectedIndex, 1)

  res.json({
    message: 'delete complete',
    indexDeleted: selectedIndex
  })
})

// start the server
app.listen(port, (req, res) => {
  console.log(`http server run at ${port}`)
})