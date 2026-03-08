const { OSUtils } = require('node-os-utils');
const path = require('path');
const express = require('express');

const app = express();
const osutils = new OSUtils();
app.use(express.json());





app.get('/api/connectiontest', (req, res) => {
    res.json({
        status: "success"
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'style.css'));
});
app.get('/colors.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'colors.css'));
});
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'script.js'));
});
app.get('/api/cpu', (req, res) => {
    osutils.cpu.usage().then(result => {
    if (result.success) {
        res.json({
            status: "success",
            usage: result.data
        });
    } else {
        res.json({
            status: "failed"
        });
    }
});
});

app.get('/api/ram', (req, res) => {
    osutils.memory.info(result => {
        if (result.success) {
            console.log(result.data)
            res.json({
                status: "success",
                usage: result.data
            });
        } else {
            res.json({
                status: "failed"
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server startet')
})