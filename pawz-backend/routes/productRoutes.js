const router = require('express').Router();
const User = require('../models/User');
const Product = require('../models/Product');


//get products
router.get('/', async(req, res)=> {
    try {
        const sort = {'_id': -1}
        const products = await Product.find().sort(sort);
        res.status(200).json(products);
      } catch (e) {
        res.status(400).send(e.message);
      }
    })

//create product
router.post('/',async(req,res)=>
{
    try{
        const{name,description,price,category,images: pictures} = req.body;
        const product = await Product.create({name,description,price,category,pictures});
        const products = await Product.find();
        res.status(201).json(products);
    }
    catch(e){
        res.status(400).send(e.message);
    }
    
})

//update product

router.patch('/:id', async(req,res)=>{
    const {id}=req.params;

    try{
        const{name,description,price,category,images: pictures} = req.body;
        const product = await Product.findByIdAndUpdate(id,{name,description,price,category,pictures});
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(e){

        res.status(400).send(e.message);
    }
})

//delete Product
router.delete('/:id', async(req,res)=>{
    const {id}=req.params;
    const {user_id}=req.body;

    try{
      const user=await User.findById(user_id);
      if(!user.isAdmin)
      return res.status(401).json("You don't have permission");
        await Product.findByIdAndDelete(id);
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(e){

        res.status(400).send(e.message);
    }
})

router.get('/:id', async(req,res)=>{
    const {id}=req.params;
    try{
        const product= await Product.findById(id);
        const similar= await Product.find({category:product.category}).limit(5);
        res.status(200).json({product,similar})
    }
    catch(e){
        res.status(400).send(e.message);
    }
})

router.get('/category/:category', async(req,res)=> {
    const {category} = req.params;
    try {
      let products;
      if(category == "all"){
        products = await Product.find().sort([['date', -1]]);
      } else {
        products = await Product.find({category})
      }
      res.status(200).json(products)
    } catch (e) {
      res.status(400).send(e.message);
    }
})

router.post ('/add-to-cart', async(req, res)=> {
  const {userId, productId, price, quantity} = req.body;
  try{
    const user= await User.findById(userId);
    const userCart = user.cart;
    
    if(user.cart[productId]){
      userCart[productId] += parseInt(quantity);
    }
    else{
      userCart[productId] = parseInt(quantity);
    }

    if (!userCart.count) {
      userCart.count = 0;
    }
    if (!userCart.total) {
      userCart.total = 0;
    }
    
    userCart.count += parseInt(quantity);
    userCart.total = Number(userCart.total) + Number(price) * parseInt(quantity);
    userCart.total = Number(userCart.total.toFixed(2));

  
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  }
  catch(e) {
    res.status(400).send(e.message);
  }
})

router.post ('/increase-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;
  try{
    const user= await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.total = Number(userCart.total.toFixed(2));
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  }
  catch(e) {
    res.status(400).send(e.message);
  }
})

router.post ('/decrease-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;
  try{
    const user= await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.total = Number(userCart.total.toFixed(2));
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  }
  catch(e) {
    res.status(400).send(e.message);
  }
})

router.post ('/remove-from-cart', async(req, res)=> {
  const {userId, productId, price} = req.body;
  try{
    const user= await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.total = Number(userCart.total.toFixed(2));
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified('cart');
    await user.save();
    res.status(200).json(user);
  }
  catch(e) {
    res.status(400).send(e.message);
  }
})


module.exports=router;
