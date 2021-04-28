
const Joi = require('joi');   // To validate input           
const express = require('express');     
const app = express(); 
//app.use(express.static('./forms'))                 
const bodyParser = require('body-parser')

app.use(express.json());

const courses = [];
const students = [];


app.use(bodyParser.urlencoded({extended:false}));

// To respond to http get request takes url and callback function / denote root 
app.get('/',(req, res) => {
   
    res.send('Hello World');
});


//...............courses............. 

// show all courses
app.get('/api/courses', (req, res) => {

    res.send(courses);
});


//   single course, api/courses/1 1: id of course 
app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('The course with the given id was not found.');
        return;
    }
    res.send(course);
});


// add course  
app.post('/api/courses', (req, res) => {
    
    const schema = Joi.object({ 

        code: Joi.string().regex(/^[a-zA-Z]{3}[0-9]{3}$/).required(),
        name: Joi.string().min(5).required(),
        description: Joi.string().max(200).allow('')
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name, 
        code: req.body.code,
        description: req.body.description
    };
    courses.push(course);
    res.send(course);
});


// Update
app.put('/api/courses/:id', (req, res) => {

    // if course not found, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) 
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // validate 
   const schema = Joi.object({ 

        code: Joi.string().regex(/^[a-zA-Z]{3}[0-9]{3}$/).required(),
        name: Joi.string().min(5).required(),
        description: Joi.string().max(200).allow('')
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    // update and return the updated course
    course.name = req.body.name;
    res.send(course);
});


// delete
app.delete('/api/courses/:id', (req, res) => {
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});


app.get('/web/courses/create', (req, res) => {

 ret = res.sendFile('forms/course_form.html', { root: __dirname });
});



//...............students ............. 

// show all students
app.get('/api/students', (req, res) => {

    res.send(students);
});


// single student, 
app.get('/api/students/:id', (req, res) => {

    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('The student with the given id was not found.');
        return;
    }
    res.send(student);
});


// add student   
app.post('/api/students', (req, res) => {
    
    const schema = Joi.object({ 

        code: Joi.string().regex(/^.{7}$/).required(),
        name: Joi.string().regex(/[a-zA-Z\-\,]/).required()
       
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
  
    // create a new course object
    const student = {
        id: students.length + 1,
        name: req.body.name, 
        code: req.body.code
    };
    students.push(student);
    res.send(student);
});


// Update
app.put('/api/students/:id', (req, res) => {

    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }

     const schema = Joi.object({ 

        code: Joi.string().regex(/^.{7}$/).required(),
        name: Joi.string().regex(/[a-zA-Z\-\,]/).required()
       
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
  

    student.name = req.body.name;
    res.send(student);
});


// Delete
app.delete('/api/students/:id', (req, res) => {
   
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }

    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same course
    res.send(student);
});


app.get('/web/students/create', (req, res) => {

 ret = res.sendFile('forms/student_form.html', { root: __dirname });

});




// Environment variable
const PORT = process.env.PORT || 3000;
console.log(PORT)
const host ='0.0.0.0';

app.listen(PORT, host , () => console.log('Listeneing'));



