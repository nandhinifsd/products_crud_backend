const productModel = require("../model/product.model");

const viewProducts = async (req, res) => {
    try {
        const vproducts = await productModel.find();
        if (!vproducts|| vproducts.length==0)
        {
            return res.status(400).json({success:false,message:"products not found"})
        }
        
        
            return res.status(200).json({success:true,message:"products details",vproducts})
        
        
    }
    catch (err)
    {
        return res.status(500).json({success:false,message:"display product operation failed"})
    }
}

const addProducts = async (req, res) => {
    try {
        const { pname, price, quantity,image } = req.body;
        if (!pname || !price || !quantity || !image) 
        {
            return res.status(400).json({ success:false, message: "products details missing" })
        }
        const addproduct = await productModel.create({ pname, price, quantity,image });
        return res.status(200).json({success:true,message:"product added successfully"})
    }
    catch (err)
    {
            return res
              .status(500)
              .json({ success:false, message: "products add operation failed missing" });

    }

}

const updateProduct = async (req,res) => {
    try {
        const { pname, price, quantity, image } = req.body;

        const updateproduct = await productModel.findByIdAndUpdate(
            req.params.id, req.body,{ new: true }
        )
        return res.status(200).json({success:true,message:"product details updated"})

    }
    catch (err) {
        return res.status(500).json({success:false,message:"product update operation failed"})
    }
}


const deleteProduct = async (req, res) => {
    try {
        
        const deleteProduct = await productModel.findByIdAndDelete(req.params.id);
        if (!deleteProduct)
        {
                    return res
                      .status(400)
                      .json({
                        success: false,
                        message: "product details not available",
                        
                      });

        }
        return res.status(200).json({success:true,message:"product details delted",deleteProduct})

    
    }
    catch (err)
    {
                return res
                  .status(500)
                  .json({
                    success: false,
                    message: "product update operation failed",
                  });

    }
}
module.exports={viewProducts,addProducts,updateProduct,deleteProduct}
