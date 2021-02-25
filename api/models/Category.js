'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

let tableSchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        required: true
    },
    name: {
        type: String
    }
}, {
    timestamps: true
});

tableSchema.plugin(autoIncrement.plugin, {
    model: 'Category',
    field: 'categoryId',
    startAt: 1000,
    incrementBy: 1
});

mongoose.model('Category', tableSchema);
