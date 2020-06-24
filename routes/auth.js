var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');


const {signup,signout,signin,isSignedIn}=require('../controllers/auth');


router.post('/signup',[check("name").isLength({ min: 3}).withMessage('name must be at least 3 chars long'),
check("email").isEmail().withMessage('email is required'),
check("password").isLength({min:3}).withMessage('password should require minimum 3 characters')


],signup);



router.post('/signin',[
check("email").isEmail().withMessage('email is required'),
check("password").isLength({min:1}).withMessage('password should required')


],signin);



router.get('/signout',signout);


module.exports=router;