const userModel = require('../models/users');
const {hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');
//Testing API 
const test = (req,res) => {
    res.json("working");
}

//User Registration
const registerUser = async (req,res) => {
   try {
        const {name, email, password} = req.body;
        if((!name) || (!password) || (!email)){
            return res.json({
                error: "Fields cannot be empty!"
        })
        } else if (password.length < 6){
            return res.json({
                error: "Password should contain minimum of 6 characters!"
        })
        }

        //check existing email
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({
                error: "Email is taken already!"
                 })
         }

         //hash password
         const hashedPassword = await hashPassword(password);

         //user create in db
         const user = await userModel.create({
            name, email, password: hashedPassword
         })

         return res.json(user)
   } catch(error){
        console.log(error);
   }
}

//User Login
const loginUser = async (req,res) => {
   try {
        const {email, password} = req.body;

        //check if user exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({ 
                error: 'No User Found!'
            })
        }

        //check if password match
        const match = await comparePassword(password, user.password)
        if(match){
            //signing json web token a cookie to track user throughout the application
            const token = jwt.sign({ id:user._id},
                process.env.JWT_SECRET,
                {expiresIn: "2h"});

            res.status(201).json({
                created:true,
                token,
                user
            })
           
        }else{
           return res.json({
                error: "Invalid Password!"
            })
        }
        

   } catch (error){
        console.log(error)
   }
}





module.exports = {
    test,
    registerUser,
    loginUser,
    
}