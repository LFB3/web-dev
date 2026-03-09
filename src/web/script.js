const cpu = document.getElementById('cpu');
async function fetchCpuUsage() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/cpu');

        if (!response.ok) {
            throw new Error('Network Error Code was not 200');
        }

        const data = await response.json();
        rounded = Math.round(data.usage * 100) / 100;
        cpu.textContent = `${rounded}%`;
    } catch (error) {
        console.error('Eroor while trying to access Data:', error);
        cpu.textContent = 'Error!';
    }
}
function memoryFormatter(bytes) {
    if (bytes >= 1099511627776) {
        thing = bytes / 1099511627776;
        rounded = Math.round(thing * 100) / 100;
        return(`${rounded}TB`);
    }
    if (bytes >= 1073741824) {
        thing = bytes / 1073741824;
        rounded = Math.round(thing * 100) / 100;
        return(`${rounded}GB`);
    }
    if (bytes >= 1048576) {
        thing = bytes / 1048576;
        rounded = Math.round(thing * 100) / 100;
        return(`${rounded}MB`);
    }
    if (bytes >= 1024) {
        thing = bytes / 1024;
        rounded = Math.round(thing * 100) / 100;
        return(`${rounded}KB`);
    }
}
async function fetchRamUsage() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/ram');

        if (!response.ok) {
            throw new Error('Network Error Code was not 200');
        }

        const data = await response.json();
        ramUsed.textContent = memoryFormatter(data.data.used);
        ramTotal.textContent = memoryFormatter(data.data.total);
        ramPercentage.textContent = Math.round(data.data.usagePercentage * 100) / 100;
    } catch (error) {
        console.error('Eroor while trying to access Data:', error);
        cpu.textContent = 'Error!';
    }
}
async function fetchDiskUsage() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/disk');

        if (!response.ok) {
            throw new Error('Network Error Code was not 200');
        }

        const data = await response.json();
        diskUsed.textContent = memoryFormatter(data.data.total - data.data.available);
        diskTotal.textContent = memoryFormatter(data.data.total);
        diskPercentage.textContent = data.data.usage;
        diskFilesystem.textContent = data.data.filesystem;
    } catch (error) {
        console.error('Eroor while trying to access Data:', error);
        cpu.textContent = 'Error!';
    }
}
fetchCpuUsage()
fetchRamUsage()
fetchDiskUsage()
const loop = setInterval(async () => {
    fetchCpuUsage()
    fetchRamUsage()
    fetchDiskUsage()
}, 6000);