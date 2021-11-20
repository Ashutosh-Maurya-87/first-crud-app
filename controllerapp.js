const MenuSchema = require('../models/MenuSchema.js');


exports.getStudent = function (req, res) {

    res.send("Hello Student! this data are coming form backend ")
}


exports.Submit = function (req, res) {
    console.log("req = ", req.body);
    res.send(req.body)

}
exports.createStudent = function (req, res) {
    res.send("Student created successfully ")
}

exports.editMenuData = async function (req, res) {
    
    let updateData = req.body;
    await MenuSchema.updateOne({ _id: req.params.menuId },{$set:updateData});

    let data = await MenuSchema.find({});
    res.send(data);
   
}


exports.deleteMenuData = async function (req, res) {
    await MenuSchema.deleteOne({ _id: req.params.menuId });
    let data = await MenuSchema.find({});
    res.send(data);
}

exports.saveDataByOne =  function (req, res) {

    let menu = new MenuSchema(req.body);
    menu.save(async function (err, menuData) {
        if (err) {
            res.status(err);
        } else {
            let data = await MenuSchema.find();
            res.send(data);
        }
    })
}
exports.getSaveData = async function (req, res) {

    
    let data = await MenuSchema.find();
    res.send(data);


}

exports.cancelSaveData = async function (req, res) {
    let data = await MenuSchema.find();
    res.send(data);


}

  


