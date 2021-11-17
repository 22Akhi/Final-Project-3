const express = require('express')
const data = require('./data')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 3000

//Route

//Logging middleware
app.use(morgan('dev'))



//CRUD  - Create, Read, Update and Delete
//post, get, put/patch, delete

//Need to pass these in order to post
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//Welcome note for homepage

app.get('/', (req,res) => {
res.send("Welcome to our schedule website")
})


//Get all users
app.get('/users', (req,res) =>{
res.send(data.users)
})


//Get all schedules
app.get('/schedules',(req,res)=>{
    res.send(data.schedules)
})


//Get individual user

app.get('/users/:id', (req, res) => {
    //TODO Validate req.params.id
  const user = data.users[req.params.id]
  res.send(user)
})


//Get user's schedule

app.get('/users/:id/schedules', (req,res) => {
  const uschedule = data.schedules.filter(schedule => schedule.user_id == Number(req.params.id))
  res.send(uschedule)  
})




// Create new schedules
app.post('/schedules', (req, res) => {
  // TODO: Validate data

  //Add new schedules to all schedules
  data.schedules.push(req.body)
  res.send(req.body)
})


//Create New User
app.post('/users', (req, res) => {
  // Using bcryptjs
  const password = req.body.password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  req.body.password = hash
  // TODO: Add hash to user object and then push to user array
  data.users.push(req.body)
  res.send(req.body)
})



app.listen(PORT, ()=>{
    console.log(`App is listening at http://localhost:${PORT}`)
})












