const express = require('express');
const router = express.Router();


const student_controller = require('../controllers/controllerapp.js');
console.log("student_controller", student_controller)


router.put('/edit/:menuId', student_controller.editMenuData);
router.delete('/delete/:menuId', student_controller.deleteMenuData);
router.post("/submit",student_controller.Submit);
router.post('/', student_controller.getStudent);

router.get('/cancel', student_controller.cancelSaveData);
router.post('/save', student_controller.saveDataByOne);
router.get('/menus', student_controller.getSaveData);

module.exports = router;



