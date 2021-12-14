//подключение модулеей для работы сервера 
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.get('*', function(req, res, next) {
    if (/.(js|css)/.test(req.url)) {
        res.sendFile(path.join(__dirname, 'newproject', req.path), 'utf-8')
        return
    }

    next()
})

app.get('/', function(req, res) {
    res.send(fs.readFileSync(path.join(__dirname, 'newproject/index.html'), 'utf-8'))
})

app.post('/form', function(req, res) {
    // res.redirect('/')
    console.log(req.body);
    res.send({ success: true, from: req.originalUrl, data: req.body })
})

app.post('/analytics', function(rq, res) {
    res.send('yes')
})

app.listen(3000)