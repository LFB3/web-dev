const { exec } = require("node:child_process");

exec('docker ps --format "{"id":"{{.ID}}", "status":"{{.Status}}", "name":"{{.Names}}"}"', (error, stdout, stderr) => {
    if (error) {
        console.error('Error executing command:', error);
        return;
    }
    console.log(typeof stdout)
    console.log(`Running containers:\n`, stdout);
    const container = stdout.trim().split(`\n`).map(line => {
        const data =JSON.parse(line);
        console.log(data.ID + data.Status + data.Names);
    })
});
