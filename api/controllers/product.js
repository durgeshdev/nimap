const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');


const ProductModel = mongoose.model('Product');


module.exports = {
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct
}

async function getAllProducts(req, res) {
    let count = req.query.limit ? Number(req.query.limit) : 10;
    let page = req.query.page ? Number(req.query.page) : 1;
    let skip = count * (page - 1);
    let conditions = {};

    let result = await ProductModel.find(conditions, null, {})
    .skip(skip)
    .limit(count)
    .populate('categoryId', 'name categoryId')

    let total = await ProductModel.countDocuments(conditions);
    // console.log('data', result)
    return res.json({
        code:200,
        data: result,
        total: total
    });

}

async function createProduct(req, res) {
    let inputData = req.body;

    let record = new ProductModel(inputData);
    await record.save();

    return res.json({message: 'Product created successfully', data: record, code: 200});
}

async function updateProduct(req, res) {
    let id = req.params.id;
    const data = req.body;
    let conditions = {
        _id: id
    }

    let info = await ProductModel.findOneAndUpdate(conditions, data);

    if (info) {
        return res.json({message: 'Product updated successfully', code:200});
    }

    return res.json({message: 'Product not found', code: 404});
}

async function deleteProduct(req, res){
    let id = req.params.id;

    let userInfo = await ProductModel.findByIdAndRemove(id);
    if(!userInfo){
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({message: 'Product not found'});
    }
    return res.json({message: 'Product delete successfully', code:200});
}