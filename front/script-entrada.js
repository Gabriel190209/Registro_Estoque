document.getElementById('formEntrada').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        nome: form.produtoEntrada.value,
        quantidade: parseInt(form.quantidadeEntrada.value, 10)
    };

    try {
        const response = await fetch('/estoque/adicionar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Entrada registrada com sucesso: ' + data.msg);
            form.reset();
        } else {
            alert('Falha ao registrar entrada: ' + data.msg);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão com o servidor ao registrar entrada.');
    }
});