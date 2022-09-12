const path = require('path');
const { readFileSync, writeFileSync, unlinkSync } = require('fs');



// make control

// all student data

const getAllStudent = (req, res) => {

    // student data

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    res.status(200).render('student/index', {

        students: students

    });

}

// create students

const createStudent = (req, res) => {

    // student data

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    res.status(200).render('student/create')

}

// view student

const getSingleStudent = (req, res) => {

    // student data

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    const { id } = req.params;

    const student = students.find(data => data.id == id)

    res.status(200).render('student/show', {

        student: student

    })

}

// edit student

const editStudent = (req, res) => {

    // student data

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    const { id } = req.params;

    const edit_data = students.find(data => data.id == id)

    res.status(200).render('student/edit', {

        student: edit_data

    })

}

// student data store

const studentDataStore = (req, res) => {

    // student data

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    // get all data

    const { name, email, cell, location } = req.body;

    // get last id

    let last_id = 1;

    if (students.length > 0) {
        last_id = students[students.length - 1].id + 1;
    }

    // add new students

    students.push({
        id: last_id,
        name: name,
        email: email,
        cell: cell,
        location: location,
        photo: req.file ? req.file.filename : "avater.png"
    });

    // now write data to json db

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students));

    // redirect

    res.redirect('/student');

}


// delete Student

const deleteStudent = (req, res) => {

    // student data

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

    const { id } = req.params;

    const newStudents = students.filter(data => data.id != id);

    // now write data to json db

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(newStudents));

    // redirect

    res.redirect('/student');

}


// update Student

const updateStudent = (req, res) => {

    // student data

    const students = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));



    const { id } = req.params;

    const ExistingPhoto = students.find(data => data.id == req.params.id).photo

    if (req.file) {
        unlinkSync(path.join(__dirname, `../public/img/students/` + `$ExistingPhoto`));
    }

    students[students.findIndex(data => data.id == id)] = {

        ...students[students.findIndex(data => data.id == id)],

        name: req.body.name,
        email: req.body.email,
        cell: req.body.cell,
        location: req.body.location,
        photo: req.file ? req.file.filename : ExistingPhoto

    }

    // now write data to json db

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students));

    // redirect

    res.redirect('/student');


}


// export control

module.exports = {
    getAllStudent,
    createStudent,
    getSingleStudent,
    editStudent,
    studentDataStore,
    deleteStudent,
    updateStudent
};