const usage = document.getElementById('usage');

const loop = setInterval(async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/cpu');
        
        if (!response.ok) {
            throw new Error('Netzwerk-Antwort war nicht ok');
        }

        const data = await response.json(); 
        
        rounded = Math.round(data.usage * 100) / 100;
        usage.textContent = `${rounded}%`;
        
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        usage.textContent = "Fehler!";
    }
}, 1000);