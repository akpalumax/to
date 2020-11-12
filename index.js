const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/Users.js');

const app = express();
const cors = require('cors');
const Joi = require('joi');


app.use(express.json())
app.use(cors())


const port = 7000;

// this is a get req
app.get("/",(req, res)=>{
  res.send("hello")
});

app.post("/", (req, res) => {
  
  const { error, value } = validateUser(req.body);
  if (error) throw error 

 const newUser= Object.assign({}, value)
 const user = new User(newUser)
 user.save().then((saveUser) => {
  res.json(saveUser)
})
.catch(error => {
  res.status(400).json(error)
})
})

app.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if(user.password === req.body.password){
      res.json(user)
    }else{
      return res.json("Invalid Email or password")
    }
   })
  .catch(err => {
    res.status(400).json(err)
  })
} )

const validateUser = (user) => {
  const validationSchema = Joi.object()
    .keys({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp(/(?=.*[a-z]){8,30}/))
        .required(),
      passwordConfirmation: Joi.ref("password"),
    })
    .with("password", "passwordConfirmation");
  return validationSchema.validate(user);
};


const uri = process.env.ATLAS_URI ;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => {
  console.log('MongoDB Connected…')

})
.catch(err => console.log(err));

app.listen(port, () => {
    console.log(`the server has started on ${port}`)
});
