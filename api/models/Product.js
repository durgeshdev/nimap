'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

let tableSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true
    },
    name: {
        type: String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true
});

tableSchema.plugin(autoIncrement.plugin, {
    model: 'Product',
    field: 'productId',
    startAt: 1000,
    incrementBy: 1
});

mongoose.model('Product', tableSchema);
