const router = require("express").Router()
const Stripe = require("stripe")
const stripe = new Stripe("sk_test_51LjeF1IPoF6qugMKhdxFtU1jdGIh8DGMcJqHRtbbkj3QXxH0qxbaVfSeSoRyTRnQwJxKH5Hi4M1uhIzBfhGt5C3t00tCJeiplB")

router.post("/payment",(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"npr"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    })
})



module.exports = router