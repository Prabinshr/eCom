const router = require("express").Router();
const Product = require("../models/Product");
const CryptoJS = require("crypto-js");
const { verifyToken,verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");

//create 

router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const saveProduct = await newProduct.save()
        res.status(200).json(saveProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//update
router.put("/:id",verifyTokenAndAdmin, async (req, res) => {

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/:id",verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been delete");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all
router.get("/",  async (req, res) => {
  const qNew = req.query.new;
  const qCat = req.query.category;
  try {
    let products;
    
    if(qNew){
     products = await Product.find().sort({ createdAt:-1 }).limit(5)
    }else if(qCat){
        products = await Product.find({
            categories:{
                $in:[qCat],
            }
        })
    }else{
        products = await Product.find()
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
