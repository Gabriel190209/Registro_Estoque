document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchProducts() {
    const tableBody = document.getElementById('product-list-body');
    const loadingMessage = document.getElementById('loading-message'); 
    
    tableBody.innerHTML = '';
    
    if (loadingMessage) {
        loadingMessage.style.display = 'block';
    }

    try {
        const response = await fetch('/vizualizar-produtos');
        const products = await response.json();

        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        if (products.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #555;">Nenhum produto cadastrado.</td></tr>';
            return;
        }

        products.forEach(product => {
            const row = tableBody.insertRow();
            
            const estoqueClass = product.estoque >= product.estoque_minimo ? 'stock-ok' : 'stock-low';

            row.innerHTML = `
                <td>${product.nome}</td>
                <td>${product.marca || 'N/A'}</td>
                <td class="${estoqueClass}">${product.estoque}</td>
                <td>${product.estoque_minimo || 'N/A'}</td>
                <td>${product.volume || 'N/A'} ${product.uni_medida || ''}</td>
                <td>${product.aplicacao || 'N/A'}</td>
            `;
        });

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        if (loadingMessage) {
             loadingMessage.textContent = 'Erro ao carregar o estoque. Verifique o servidor.';
        } else {
             tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: red;">Erro ao carregar o estoque.</td></tr>';
        }
    }
}