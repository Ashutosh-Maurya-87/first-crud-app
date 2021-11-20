const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let MenuSchema = new Schema({
    menuLabel: {
        type: String,
        required: true,
    },
    selectCamera: {
        type: String,
        required: true,
        
    },
    offsetX: {
        type: String,
        required: true,
    },
    offsetY: {
        type: String,
        required: true
    },
    offsetZ: {
        type: String,
        required: true,
    },
    cameraFOV: {
        type: String,
        required: true
    },
    menuLink: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('menus', MenuSchema);
