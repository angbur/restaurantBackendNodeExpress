const User = require('../models/user.model');
const  {registerValidation, loginValidation, updateValidation}= require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.registration = async (req,res) => {

    const {error} = registerValidation(req.body)
     if(error) return res.status(400).send({'message': 'The data provided does not meet the criteria'});
 
     const emailExist = await User.findOne({email: req.body.email});
     if(emailExist) return res.status(400).send({'message': 'The login/password you entered already exists'})

     const loginExist = await User.findOne({login: req.body.login});
     if(loginExist) return res.status(400).send({'message': 'The login/password you entered already exists'})

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt)
     try{
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword
        });
        
      const newUser = await user.save()
      res.status(201).send({
        'status': 201,
        'data': {
            'message': 'Registration was successful!'
        },
        'isSuccess': true
      });
      } catch(error) {
        res.status(400).json({message:error.message})
      }
      }

exports.logging = async (req,res) => {

    const {error} = loginValidation(req.body)
     if(error) return res.status(400).send({
      'message': 'The data provided does not meet the criteria',
     });

    const user = await User.findOne({login: req.body.login});
     if(!user) return res.status(400).send({'message': 'The login/password you entered does not exist'})

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send({'message': 'The login/password you entered does not exist'})

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('Authorization', `Bearer ${token}`).header('_id',user._id).send({
        'status': 200,
        'data': {
            'message': 'You are logged in!'
        },
        'isSuccess': true,
        'token': token,
        'userId': user._id,
        'login': user.login
      })
}

exports.getUser = async (req, res) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (isIdValid) {
      const user = await User.findById({_id:req.params.id}).select('-password');
      if (!user)
        return res
          .status(404)
          .send({'message': 'The user does not exist'});
      res.status(200).send(user);
    } else {
      res.status(400).send({'message': 'Incorrect ID number entered'});
    }
};

exports.updatedUser = async (req, res) => {

    const {error} = updateValidation(req.body);   

    if(error) return res.status(400).send({'message': 'The data provided does not meet the criteria'});

    try {
      if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword
      }
      
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec();
    
        if (!updatedUser) {
          return res.status(400).send({'message': 'The user specified does not exist'});
        }
        res.status(200).send('Data updated');
      } catch (e) {
        res.status(400).send({message : e.message});
      }
    }

exports.getLoggedInUser = async (req, res) => {
  let user;
  try{
    user = await User.findOne().where('login').equals(req.params.login).select('-password').catch(error=>{
      throw new Error('There is no user with this login');
    });
  } catch (error) {
    return res.status(400).send({message:error.message});
  };
  return res.send(user);
};