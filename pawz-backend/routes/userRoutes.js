const router = require('express').Router();
const User = require('../models/User');
const Order = require ('../models/Order');

router.post('/signup', async(req, res) => {
    const {firstname, lastname, email, password} = req.body;

    try{
        const user= await User.create({firstname, lastname, email, password});
        res.json(user);
    } 
    catch(e){
        if(e.code === 11000)
        return res.status(400).send('This email already exists');
        res.status(400).send(e.message)
    }
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    try{
        const user= await User.findByCredentials(email, password);
        res.json(user);
    } 
    catch(e){
        res.status(400).send(e.message);
    }
})


router.get('/', async(req, res)=> {
    try{
        const users = await User.find({isAdmin:false}).populate('orders');
        res.json(users);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

router.get('/:id/orders', async(req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findById(id).populate('orders');
        res.json(user.orders);
    }
    catch(e){
        res.status(400).send(e.message);
    }
})

module.exports = router;