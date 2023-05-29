const jwt = require('jsonwebtoken');
const authenticateUser = ( async (req,res,next)=> {
    try{
        const authorization =  req.get("authorization")
        if(authorization && authorization.startsWith('Bearer')){
            const token = authorization.split(' ')[1]
            console.log(token)
            jwt.verify(token, process.env.JWT_SECRET , async (err,user)=>{
                if(err && err?.name === 'TokenExpiredError') {
                 return res.status(403).send("Token expired") }
                else if(err) {
                    return res.status(401).send('Not Authorized, Invalid Token')
                }
                else{
                next()
                }
           })
                     
    } else{
        return res.status(401).send('Not Authorized!')
    } 
    } catch(err){
       return res.status(401).send("Not Authorized, No Token'")
    }
})

module.exports = {authenticateUser};