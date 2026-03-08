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
        return(`${(bytes / 1099511627776)}TB`)
    }
    if (bytes >= 1073741824) {
        return(`${(bytes / 1073741824)}GB`)
    }
    if (bytes >= 1048576) {
        return(`${(bytes / 1048576)}KB`)
    }
    if (bytes >= 1024) {
        return(`${(bytes / 1024)}KB`)
    }
}
async function fetchRamUsage() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/ram');

        if (!response.ok) {
            throw new Error('Network Error Code was not 200');
        }

        const data = await response.json();
        ramUsed.textContent = memoryFormatter(data.used);
        ramTotal.textContent = memoryFormatter(data.total);
        ramPercentage.textContent = memoryFormatter(data.usagePercentage);
    } catch (error) {
        console.error('Eroor while trying to access Data:', error);
        cpu.textContent = 'Error!';
    }
}
fetchCpuUsage()
fetchRamUsage()
const loop = setInterval(async () => {
    fetchCpuUsage()
    fetchRamUsage()
}, 6000);