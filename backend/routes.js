const express = require('express');
const router = express.Router();
const Student = require('./models/students');

// get all members
router.get('/students', async(req, res) => {
    const allStudents = await Student.find();
    console.log(allStudents);
    res.send(allStudents);
});
// get one student via id
router.get('/students/:id', async(req, res) => {
    const student = await Student.findOne({ _id: req.params.id });
    console.log(req.params);
    if(student) {
        res.send(student);
    } else {
        res.status(404);
        res.send({
            error: "Student does not exist!"
        });
    }
})

router.post('/students', async(req, res) => {
    const newStudent = new Student({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        kurse:req.body.kurse,

    })
    await newStudent.save();
    res.send(newStudent);
});


// update one student
router.patch('/students/:id', async(req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id })

        if (req.body.firstname) {
            student.firstname = req.body.firstname
        }

        if (req.body.lastname) {
            student.lastname = req.body.lastname
        }

        if (req.body.email) {
            student.email = req.body.email
        }

        if (req.body.address) {
            student.address = req.body.address
        }
        if (req.body.kurse) {
            student.kurse = req.body.kurse
        }


        await Student.updateOne({ _id: req.params.id }, student);
        res.send(student)
    } catch {
        res.status(404)
        res.send({ error: "Student does not exist!" })
    }
});
// delete one student via id
router.delete('/students/:id', async(req, res) => {
    try {
        await Student.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Student does not exist!" })
    }
});


module.exports = router;