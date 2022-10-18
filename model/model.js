const mongoose = require('mongoose');


const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name'],
        trim: true,
        unique: [true, 'name must be unique'],
        minLength: [3, 'Name will be 3 character'],
        maxLength: [20, 'Name is too large']
    },
    price: {
        type: Number,
        required: [true, 'please provide price'],
        minLength: [0, 'Price can not be Negative'],
    },
    views: {

        type: Number,
        required: [true, "Please give a value to views"],
        min: [0, "Views can't be less than 0"],
        default: 0,
    },
    image: {
        type: String,
        required: [true, 'please provide an image'],
    }

}, {
    timestamps: true,
});


tourSchema.path('image').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL of Image.');


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;