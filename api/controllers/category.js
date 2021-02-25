const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');


const CategoryModel = mongoose.model('Category');


module.exports = {
    getAllCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory
}

async function getAllCategories(req, res) {
    let conditions = {};
    let result = await CategoryModel.find(conditions, null, {})

    let total = await CategoryModel.countDocuments(conditions);
    // console.log('data', result)
    return res.json({
        code:200,
        data: result,
        total: total
    });

}

async function createCategory(req, res) {
    let inputData = req.body;

    let record = new CategoryModel(inputData);
    await record.save();

    return res.json({message: 'category created successfully', data: record, code: 200});
}

async function updateCategory(req, res) {
    let id = req.params.id;
    const data = req.body;
    let conditions = {
        _id: id
    }

    let info = await CategoryModel.findOneAndUpdate(conditions, data);

    if (info) {
        return res.json({message: 'category updated successfully', code:200});
    }

    return res.json({message: 'category not found', code: 404});
}

async function deleteCategory(req, res){
    let id = req.params.id;

    let userInfo = await CategoryModel.findByIdAndRemove(id);
    if(!userInfo){
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({message: 'category not found'});
    }
    return res.json({message: 'Category delete successfully', code: 200});
}