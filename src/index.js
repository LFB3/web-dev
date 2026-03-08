const { OSUtils } = require('node-os-utils');
const path = require('path');
const express = require('express');

const app = express();
const osutils = new OSUtils();
app.use(express.json());





app.get('/api/connectiontest', async (req, res) => {
    res.json({
        status: "success"
    });
});

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
});
app.get('/style.css', async (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'style.css'));
});
app.get('/colors.css', async(req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'colors.css'));
});
app.get('/script.js', async (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'script.js'));
});
app.get('/api/cpu', async (req, res) => {
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

app.get('/api/ram', async (req, res) => {
    try {
        const memInfo = await osutils.memory.info();
        if (memInfo.success) {
            data = ({
                usagePercentage: memInfo.data.usagePercentage,
                total: memInfo.data.total.bytes,
                used: memInfo.data.used.bytes
            })
            res.status(200).json({
                success: true,
                data: data
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Error, coud not get memory info"
            });
        }
    } catch (error) {
        console.error("Error while trying to access Memory Info:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
app.listen(3000, () => {
    console.log('Server startet')
})