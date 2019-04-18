const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Exercise = require('../models/exercise');

// Users Endpoints
router.get('/', (req,res,next) => {
    res.send('<h1>Router Test</h1>');
});
  
router.get('/users', (req,res,next) => {
    User.find({}, (err, users) => {
        if(err) throw err;
        res.json(users);
    });
});

router.post('/new-user', (req, res) => {
    var user = new User(req.body);
    user.save((err,data)=> {
        if(err) throw err;
        res.json(user);
    });
});

// Exercise Endpoints
  
router.get('/log', (req,res,next) => {
    User.findById(req.query.userId, (err,user) => {
        if(err) return next(err);
        if(!user){
            const errObj = new Error('unkown User');
            errObj.status = 400;
            return next(errObj);
        }
        var from = new Date(req.query.from);
        var to = new Date(req.query.to);
        var query = {
            userId: req.query.userId,
            date: { 
                $gt: from == 'Invalid Date' ? new Date(0) : from,
                $lt: to == 'Invalid Date' ? new Date(Date.now()) : to
            }
        };
        Exercise.find(query)
        .limit(parseInt(req.query.limit))
        .exec((err, exes) => {
            if(err) return next(err);
            var resObj = {};
            resObj.username = user.username;
            resObj._id = user._id;
            resObj.count = exes.length;
            resObj.log = [];
            exes.forEach(element =>{
                resObj.log.push({
                    description: element.description,
                    duration: element.duration,
                    date: element.date.toDateString()
                });
            })
            res.json(resObj);
        });
    })
});
  
router.post('/add', (req,res,next) => {
    User.findById(req.body.userId, (err, user) => {
        if(err) return next(err);
        if(!user){
            const errObj = new Error('unknowd id');
            errObj.status = 400
            return next(errObj);
        }
        var exercise = new Exercise(req.body);
        exercise.username = user.username;
        if(!exercise.date){
            exercise.date = Date.now();
        }
        exercise.save((err,data) => {
            if(err) next(err);
            res.json(data);
        });
    });
});

module.exports = router;