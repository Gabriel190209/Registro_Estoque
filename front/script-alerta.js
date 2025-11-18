document.addEventListener('DOMContentLoaded', fetchAlerts);

async function fetchAlerts() {
    const container = document.getElementById('alert-list-container');
    const loadingMessage = document.getElementById('loading-alert');
    const noAlertMessage = document.getElementById('no-alert-message');
    
    container.innerHTML = '';
    loadingMessage.style.display = 'block';
    noAlertMessage.style.display = 'none';

    try {
        const response = await fetch('/alertas');
        const alerts = await response.json();

        loadingMessage.style.display = 'none';

        if (alerts.length === 0) {
            noAlertMessage.style.display = 'block';
            return;
        }

        alerts.forEach(item => {
            const alertItem = document.createElement('div');
            alertItem.className = 'alert-item';
            
            alertItem.innerHTML = `
                <span class="alert-name">${item.nome}</span>
                <span class="alert-data">Estoque: ${item.estoque} (Mínimo: ${item.estoque_minimo})</span>
                <button class="action-button" onclick="window.location.href='/entrada'">Reabastecer</button>
            `;
            container.appendChild(alertItem);
        });

    } catch (error) {
        console.error('Erro ao buscar alertas:', error);
        loadingMessage.textContent = 'Erro ao carregar alertas críticos.';
        loadingMessage.style.color = '#d9534f';
    }
}