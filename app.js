const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'todolist'
})

connection.connect()

app.post('/createTask/:taskname/:status', (req, res) => {
    var taskName = req.params.taskname
    var taskStatus = req.params.status
    
    const query = 'INSERT INTO tasks (taskname, taskstatus) VALUES (?, ?)';
    const values = [taskName, taskStatus];
    connection.query(query, values)
    
    res.json({
        'task_name': taskName,
        'task_status': taskStatus
    })
})

app.delete('/deleteTask/:taskId', (req, res) => {
    var taskId = req.params.taskId
    const query = 'DELETE FROM tasks WHERE id = ?'
    connection.query(query, taskId)

    res.json('task deleted')
})

app.get('/fetchTasks', (req, res) => {
    const query = 'SELECT * FROM tasks'
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error connecting to db' });
        }
        res.json(results);
    })
})

app.listen(port, () =>{
    console.log('app running on port ' + port)
})