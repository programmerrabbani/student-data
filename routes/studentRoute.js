const express = require('express');
const { getAllStudent, createStudent, getSingleStudent, editStudent, studentDataStore, deleteStudent, updateStudent } = require('../controller/studentController');
const multer = require('multer');
const path = require('path');



// init router

const router = express.Router();

// multer config

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/students'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }

});


const studentPhotoMulter = multer({
    storage: storage
}).single('student-photo');

// make route

router.get('/', getAllStudent)
router.get('/create', createStudent)
router.post('/create', studentPhotoMulter, studentDataStore)

router.get('/edit/:id', editStudent)
router.post('/update/:id', studentPhotoMulter, updateStudent)

router.get('/delete/:id', deleteStudent)

router.get('/:id', getSingleStudent)


// export router

module.exports = router;