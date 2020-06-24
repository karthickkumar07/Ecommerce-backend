const {Order,ProductCart}=require('../models/order');

exports.getOrderById=(req,res,next,id)=>{
    Order.findById(id)
    .populate('products.product','name price') // we can add more but dont put comma
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order found in db"
            })
        }
        req.order=order;
        next();
    })
}

exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile;
    const order=new Order(req.body.order)
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to save order in db"
            });
        }
        res.json(order);
    })
}

exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate('User','_id name')
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"no orders found"
            })
        }
        res.json(order);
    })
}

exports.getOrderStatus=(req,res)=>{
   return res.json(Order.schema.path('status').enumValues);
};
exports.updateStatus=(req,res)=>{
   Order.update(
       {id:req.body.orderId},
   {$set:{status:req.body.status}},
   (err,order)=>{
    
        if(err){
            return res.status(400).json({
                error:"cannot update order"
            })
        }
        res.json(order);
   }
   
   )
}