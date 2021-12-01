const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'school'
});
 
connection.connect();

app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/student',(req,res)=>{
    connection.query('SELECT * from student',(err,rows,field)=>{
        if(!err){
        res.send(rows)
        }
        else{
        res.send(err)
        }
    })
})
app.get('/class',(req,res)=>{
    connection.query('SELECT * from class',(err,rows,field)=>{
        if(!err){
        res.send(rows)
        }
        else{
        res.send(err)
        }
    })
})
app.get('/class/:id',(req,res)=>{
    connection.query('SELECT * from class where id_class = ?',[req.params.id],(err,rows,field)=>{
        if(!err){
        res.send(rows)
        }
        else{
        res.send(err)
        }
    })
})
app.get('/program',(req,res)=>{
    connection.query('SELECT * from program',(err,rows,field)=>{
        if(!err){
        res.send(rows)
        }
        else{
        res.send(err)
        }
    })
})
app.get('/program/:id',(req,res)=>{
    connection.query('SELECT * from program where id_program = ?',[req.params.id],(err,rows,field)=>{
        if(!err){
        res.send(rows)
        }
        else{
        res.send(err)
        }
    })
})
app.get('/student/:id',(req,res)=>{
    connection.query('SELECT * from student where id_student = ?',[req.params.id],(err,rows,field)=>{
        if(!err){
        res.send(rows)
        }
        else{
        res.send(err)
        }
    })
})

app.delete('/student/:id',(req,res)=>{
    connection.query('Delete  from student where id_student = ?',[req.params.id],(err,rows,field)=>{
        if(!err){
        res.send('delete success')
        }
        else{
        res.send(err)
        }
    })
})

app.post('/student', (req,res)=>{
    const name = req.query.name
    const sex = req.query.sex
    connection.query('INSERT INTO student(name,sex) values(?,?)',[name,sex],(err,result)=>{
        if(!err){
            res.send('insert success')
            }
            else{
            res.send(err)
            }
    })
})


app.post('/class', (req,res)=>{
    const name = req.query.name
    const required = req.query.required
    connection.query('INSERT INTO class(name,required) values(?,?)',[name,required],(err,result)=>{
        if(!err){
            res.send('insert success')
            }
            else{
            res.send(err)
            }
    })
})

app.post('/class/update', (req,res)=>{
    const idClass = req.query.id_class
    const required = req.query.required
    connection.query('UPDATE class set required = ? where id_class = ?',[required,idClass],(err,result)=>{
        if(!err){
            res.send('insert success')
            }
            else{
            res.send(err)
            }
    })
})


app.post('/program', (req,res)=>{
    const idClass = req.query.id_class
    const idStudent = req.query.id_student
    const name = req.query.name
    connection.query('INSERT INTO program(id_class,id_student,name) values(?,?,?)',[idClass,idStudent,name],(err,result)=>{
        if(!err){
            res.send('insert success')
            }
            else{
            res.send(err)
            }
    })
})

app.listen(5000)